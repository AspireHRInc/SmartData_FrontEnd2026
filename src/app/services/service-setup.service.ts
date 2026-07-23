
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiStateService } from './ui-state.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { BlobReader, BlobWriter, ZipWriter, ZipReader, Uint8ArrayWriter } from '@zip.js/zip.js';

export class Field {
  ParameterName = '';
  Caption = '';
  Required = false;
  DefaultValue?: string = '';
  TemplateS3Path?: string = '';
  ParameterType = '';
  Options?: fieldOptions[] = [];
  DisplayOrder = 0;
  UploadSaveUrl?: string = '';
  UploadRemoveUrl?: string = '';
  HelpText?: string = '';
  value?: any;
  ShowHelpOnFocus?: boolean;

  constructor() {}
}

export class fieldOptions {
  Pvalue?: string = '';
  Plabel?: string = '';

  constructor() {}
}

export class Fields {
  tags: string[] = [];
  Parameters: Field[] = [];
  DXScriptS3Path = '';
  longDescription = '';

  constructor() {}
}

export class setupOptions {
  Parameters = [];

  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class ServiceSetupService {
  currentServiceFields: Fields = new Fields();
  currentServiceSetup: Field[] = [];
  currentProcessItem: any = null;
  private setupLocked = false;

  // BehaviorSubject to notify UI components when setup changes
  private serviceFieldsSubject = new BehaviorSubject<Fields>(new Fields());
  serviceFields$ = this.serviceFieldsSubject.asObservable();

  private serviceSetupSubject = new BehaviorSubject<Field[]>([]);
  serviceSetup$ = this.serviceSetupSubject.asObservable();

  // Track whether setup has been loaded to prevent stale reads
  private setupLoaded = false;
  get isSetupLoaded(): boolean {
    return this.setupLoaded;
  }

  private apiBase = environment.apiUrl;

  constructor(
    private uiState: UiStateService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.uiState.abandonCurrentForm$.subscribe(() => {
      this.currentFormAbandoned();
    });
  }

  lockSetup(): void {
    this.setupLocked = true;
  }

  unlockSetup(): void {
    this.setupLocked = false;
  }

  private getIdToken(): string {
    return this.authService.getIdToken();
  }

  private getHeaders(): HttpHeaders {
    const idToken = this.getIdToken();

    let partition = '';
    try {
      if (idToken && idToken.split('.').length === 3) {
        const payload = JSON.parse(atob(idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        partition = (payload['custom:Org'] || partition).replace(/#$/, '');
      }
    } catch (e) {
      console.warn('Could not decode token for Partition header');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${idToken}`,
      'Partition': partition
    });
  }

  // ============================================
  // AES-256 ZIP ENCRYPTION / DECRYPTION
  // ============================================

  /**
   * Gets the encryption password (RepositoryName equivalent).
   * This mirrors the .NET logic where RepositoryName is used as the ZIP password.
   * Adjust this to match where your RepositoryName comes from.
   */
  private getEncryptionPassword(): string {
    // Option 1: From the process item (most likely matches .NET RepositoryName)
    if (this.currentProcessItem?.repositoryName) {
      return this.currentProcessItem.repositoryName;
    }

    // Option 2: From the partition/org (if RepositoryName maps to org)
    const idToken = this.getIdToken();
    if (idToken && idToken.split('.').length === 3) {
      try {
        const payload = JSON.parse(atob(idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        const org = payload['custom:Org'] || '';
        if (org) return org.replace(/#$/, '');
      } catch (e) {
        console.warn('Could not extract org for encryption password');
      }
    }

    // Option 3: Fallback — you'll want to replace this with your actual source
    console.warn('No encryption password source found — using fallback');
    return '';
  }

  /**
   * Encrypts a file using AES-256 ZIP compression with password.
   * Mirrors the .NET CreateZip with EnumCompressionType.ZipAES256CompressionWithPassword
   *
   * @param file - The File object from the file input
   * @param password - The encryption password (RepositoryName)
   * @returns Promise<Blob> - The encrypted ZIP blob
   */
  async encryptFile(file: File, password?: string): Promise<Blob> {
    const encryptionPassword = password || this.getEncryptionPassword();

    if (!encryptionPassword) {
      throw new Error('No encryption password available. Cannot encrypt file.');
    }

    const blobWriter = new BlobWriter('application/zip');

    const zipWriter = new ZipWriter(blobWriter, {
      password: encryptionPassword,
      encryptionStrength: 3, // 3 = AES-256 (matches newEntry.AESKeySize = 256)
      level: 3,              // Compression level (matches zipStream.SetLevel(3))
    });

    // Add the file to the ZIP archive
    await zipWriter.add(file.name, new BlobReader(file), {
      password: encryptionPassword,
      encryptionStrength: 3,
      lastModDate: new Date(file.lastModified),
    });

    await zipWriter.close();
    return blobWriter.getData();
  }

  /**
   * Encrypts multiple files into a single AES-256 encrypted ZIP.
   * Mirrors .NET CompressFolder behavior for multiple files.
   */
  async encryptFiles(files: File[], password?: string): Promise<Blob> {
    const encryptionPassword = password || this.getEncryptionPassword();

    if (!encryptionPassword) {
      throw new Error('No encryption password available. Cannot encrypt files.');
    }

    const blobWriter = new BlobWriter('application/zip');

    const zipWriter = new ZipWriter(blobWriter, {
      password: encryptionPassword,
      encryptionStrength: 3,
      level: 3,
    });

    for (const file of files) {
      await zipWriter.add(file.name, new BlobReader(file), {
        password: encryptionPassword,
        encryptionStrength: 3,
        lastModDate: new Date(file.lastModified),
      });
    }

    await zipWriter.close();
    return blobWriter.getData();
  }

  /**
   * Decrypts an AES-256 encrypted ZIP file.
   * Used when user downloads output files or re-downloads their uploaded input.
   */
  async decryptFile(encryptedBlob: Blob, password?: string): Promise<{ filename: string; data: Uint8Array }[]> {
    const encryptionPassword = password || this.getEncryptionPassword();

    if (!encryptionPassword) {
      throw new Error('No encryption password available. Cannot decrypt file.');
    }

    const zipReader = new ZipReader(new BlobReader(encryptedBlob), {
      password: encryptionPassword,
    });

    const entries = await zipReader.getEntries();
    const decryptedFiles: { filename: string; data: Uint8Array }[] = [];

    for (const entry of entries) {
      if (!entry.directory && entry.getData) {
        const writer = new Uint8ArrayWriter();
        const data = await entry.getData(writer, {
          password: encryptionPassword,
        });

        decryptedFiles.push({
          filename: entry.filename,
          data: data,
        });
      }
    }

    await zipReader.close();
    return decryptedFiles;
  }

  /**
   * Triggers a browser download of a decrypted file.
   */
  downloadDecryptedFile(data: Uint8Array, filename: string): void {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Full download + decrypt flow for output/input files.
   * Call this when user clicks download on an encrypted file.
   */
  async downloadAndDecrypt(fileUrl: string, password?: string): Promise<void> {
    const headers = this.getHeaders();

    const response = await this.http.get(fileUrl, {
      headers,
      responseType: 'blob',
    }).toPromise();

    if (!response) {
      throw new Error('Failed to download file');
    }

    const decryptedFiles = await this.decryptFile(response, password);

    for (const file of decryptedFiles) {
      this.downloadDecryptedFile(file.data, file.filename);
    }
  }

  // ============================================
  // FILE UPLOAD HANDLER (with encryption)
  // ============================================

  /**
   * Handles file upload for a field parameter.
   * Encrypts the file before uploading to S3/backend.
   *
   * @param field - The Field with ParameterType 'file'
   * @param file - The raw File from the input element
   * @returns Observable with the upload result (S3 path, etc.)
   */
  uploadFileEncrypted(field: Field, file: File): Observable<any> {
    const uploadUrl = field.UploadSaveUrl || `${this.apiBase}/files/upload`;
    const headers = this.getHeaders();

    // Encrypt then upload
    return new Observable(observer => {
      this.encryptFile(file)
        .then(encryptedBlob => {
          const formData = new FormData();
          formData.append('file', encryptedBlob, file.name + '.zip');
          formData.append('originalFileName', file.name);
          formData.append('parameterName', field.ParameterName);

          this.http.post<any>(uploadUrl, formData, { headers }).subscribe({
            next: (result) => {
              // Store the S3 path or reference as the field value
              field.value = result.s3Path || result.filePath || result.url || file.name;
              this.emitUpdate();
              observer.next(result);
              observer.complete();
            },
            error: (err) => {
              console.error('File upload failed:', err);
              observer.error(err);
            }
          });
        })
        .catch(err => {
          console.error('File encryption failed:', err);
          observer.error(err);
        });
    });
  }

  // ============================================
  // EXISTING SERVICE METHODS (unchanged)
  // ============================================

  private mapParameterType(apiType: string): string {
    if (!apiType) return 'text';

    const typeMap: { [key: string]: string } = {
      'Text': 'text',
      'text': 'text',
      'String': 'text',
      'string': 'text',
      'TextArea': 'text',
      'textarea': 'text',
      'MultiLine': 'text',
      'Selection': 'selection',
      'selection': 'selection',
      'Dropdown': 'selection',
      'dropdown': 'selection',
      'Select': 'selection',
      'select': 'selection',
      'ComboBox': 'selection',
      'File': 'file',
      'file': 'file',
      'Upload': 'file',
      'upload': 'file',
      'OutputFile': 'outputfile',
      'outputfile': 'outputfile',
      'OutputFileTemplate': 'outputfile',
      'Checkbox': 'checkbox',
      'checkbox': 'checkbox',
      'Boolean': 'checkbox',
      'boolean': 'checkbox',
      'Toggle': 'checkbox',
      'ConnectionString': 'connectionstring',
      'connectionstring': 'connectionstring',
      'Password': 'password',
      'password': 'password',
      'Date': 'date',
      'date': 'date',
      'DateTime': 'date',
      'datetime': 'date',
      'Number': 'text',
      'number': 'text',
      'Integer': 'text',
    };

    return typeMap[apiType] || 'text';
  }

  loadServiceSetup(processItem: any): void {
    if (this.setupLocked) {
      console.log('loadServiceSetup skipped — setup is locked');
      return;
    }

    if (!processItem) {
      console.warn('loadServiceSetup called with null/undefined processItem — skipping');
      return;
    }

    console.log('loadServiceSetup called with:', processItem);

    this.currentProcessItem = processItem;

    const allParams = processItem.inputParameters || processItem.InputParameters || [];
    const inputParams = allParams.filter((param: any) => {
      const metadata = param.parameterMetadata || {};
      return metadata.visibility === true || metadata.visibility === 'true';
    });
    console.log('Input parameters found:', inputParams);

    if (inputParams.length === 0) {
      console.log('No input parameters defined for this process');
      this.currentServiceFields = new Fields();
      this.currentServiceSetup = [];
      this.setupLoaded = true;
      this.emitUpdate();
      return;
    }

    const fields: Field[] = inputParams.map((param: any, index: number) => {
      const metadata = param.parameterMetadata || {};
      const field = new Field();

      field.ParameterName = param.name || '';
      field.Caption = metadata.caption || param.name || '';
      field.Required = metadata.required === true || metadata.required === 'true';

      field.DefaultValue = param.defaultValue !== undefined && param.defaultValue !== null
        ? String(param.defaultValue)
        : (param.value !== undefined && param.value !== null ? String(param.value) : '');

      field.ParameterType = this.mapParameterType(metadata.parameterType);

      field.HelpText = field.ParameterType === 'selection'
        ? (metadata.helpText || '')
        : (metadata.additionalMetadata || metadata.helpText || '');

      field.DisplayOrder = metadata.displayOrder || (index * 10);

      field.value = field.DefaultValue;

      // --- DROPDOWN OPTIONS MAPPING ---
      if (field.ParameterType === 'selection') {
        let rawOptions: any = metadata.options || null;

        if (!rawOptions && metadata.additionalMetadata) {
          const additional = metadata.additionalMetadata;

          if (typeof additional === 'string') {
            try {
              const parsed = JSON.parse(additional);

              if (typeof parsed === 'object' && !Array.isArray(parsed)) {
                rawOptions = Object.entries(parsed).map(([label, value]) => ({
                  Plabel: label,
                  Pvalue: value as string
                }));
              } else if (Array.isArray(parsed)) {
                rawOptions = parsed;
              }
            } catch (e) {
              if (additional.includes('|')) {
                rawOptions = additional.split('|').map((s: string) => s.trim());
              } else if (additional.includes(',')) {
                rawOptions = additional.split(',').map((s: string) => s.trim());
              }
              console.warn(`Could not JSON-parse additionalMetadata for "${field.ParameterName}", tried delimiter split:`, rawOptions);
            }
          } else if (Array.isArray(additional)) {
            rawOptions = additional;
          } else if (typeof additional === 'object' && additional.options) {
            rawOptions = additional.options;
          }
        }

        if (!rawOptions) {
          rawOptions = param.options || param.allowedValues || param.values || null;
        }

        if (Array.isArray(rawOptions) && rawOptions.length > 0) {
          field.Options = rawOptions.map((opt: any) => {
            const option = new fieldOptions();
            if (typeof opt === 'string') {
              option.Pvalue = opt;
              option.Plabel = opt;
            } else {
              option.Pvalue = opt.Pvalue || opt.value || opt.id || String(opt);
              option.Plabel = opt.Plabel || opt.label || opt.name || opt.text || option.Pvalue;
            }
            return option;
          });
        }

        if (field.Options && field.Options.length > 0 && field.DefaultValue) {
          const matchingOption = field.Options.find(o => o.Pvalue === field.DefaultValue);
          if (matchingOption) {
            field.value = matchingOption.Pvalue;
          } else {
            const matchByLabel = field.Options.find(o => o.Plabel === field.DefaultValue);
            if (matchByLabel) {
              field.value = matchByLabel.Pvalue;
            } else {
              console.warn(
                `Default value "${field.DefaultValue}" for "${field.ParameterName}" not found in options.`
              );
            }
          }
        }
      } else {
        if (metadata.options && Array.isArray(metadata.options)) {
          field.Options = metadata.options.map((opt: any) => {
            const option = new fieldOptions();
            option.Pvalue = opt.value || opt.Pvalue || opt;
            option.Plabel = opt.label || opt.Plabel || opt;
            return option;
          });
        }
      }

      if (metadata.templateS3Path) {
        field.TemplateS3Path = metadata.templateS3Path;
      }
      if (metadata.uploadSaveUrl) {
        field.UploadSaveUrl = metadata.uploadSaveUrl;
      }
      if (metadata.uploadRemoveUrl) {
        field.UploadRemoveUrl = metadata.uploadRemoveUrl;
      }

      return field;
    });

    fields.sort((a, b) => a.DisplayOrder - b.DisplayOrder);

    const result = new Fields();
    result.Parameters = fields;
    result.tags = processItem.tags || [];
    result.DXScriptS3Path = processItem.dxScriptS3Path || '';
    result.longDescription = processItem.longDescription || processItem.description || '';

    this.currentServiceFields = result;
    this.currentServiceSetup = fields;
    this.setupLoaded = true;

    this.emitUpdate();

    console.log('Mapped service fields:', result);
    console.log('Parameters count:', fields.length);
    console.log('Parameter details:', fields.map(f =>
      `${f.ParameterName}: type="${f.ParameterType}" value="${f.value}" default="${f.DefaultValue}" options=${f.Options?.length || 0}`
    ));
  }

  // Central emit method to push state to subscribers
  private emitUpdate(): void {
    this.serviceFieldsSubject.next(this.currentServiceFields);
    this.serviceSetupSubject.next([...this.currentServiceSetup]);
  }

  onFileRemove(fileName: string) {
    console.log('service: on file remove/cancel ', fileName);
  }

  /**
   * Executes the process. Returns the Observable so the caller can handle refresh.
   */
  executeProcess(taskName: string): Observable<any> {
    const processItem = this.currentProcessItem;

    if (!processItem) {
      console.error('No process item available for execution');
      this.uiState.setErrorNotification('Unable to execute: no process loaded');
      return of(null);
    }

    const filledParams = this.currentServiceSetup.map(field => ({
      name: field.ParameterName,
      value: field.value !== undefined && field.value !== null ? field.value : (field.DefaultValue || ''),
      defaultValue: field.DefaultValue || '',
      parameterMetadata: {
        caption: field.Caption,
        parameterType: field.ParameterType,
        required: field.Required,
        displayOrder: field.DisplayOrder,
        additionalMetadata: field.HelpText || ''
      }
    }));

    const sk = processItem.SK || '';
    const uuid = sk.includes('#') ? sk.split('#')[1] : sk;

    if (!uuid) {
      console.error('No process UUID available for execution');
      this.uiState.setErrorNotification('Unable to execute: missing process ID');
      return of(null);
    }

    const headers = this.getHeaders();

    const body = {
      inputParameters: filledParams,
      myTag: processItem.myTags || processItem.tags || '',
      name: taskName || processItem.name || '',
      imageJpgBase64: processItem.imageJpgBase64 || '',
      start: processItem.start || '',
      finish: processItem.finish || ''
    };

    console.log('Executing process:', processItem.name);
    console.log('Task name:', taskName);
    console.log('UUID:', uuid);
    console.log('Request body:', body);
    console.log('currentServiceSetup values:', this.currentServiceSetup.map(f => ({ name: f.ParameterName, value: f.value })));

    return this.http.post<any>(
      `${this.apiBase}/CPT/${uuid}/executeProcess`,
      body,
      { headers }
    );
  }

  currentFormAbandoned() {
    console.log('current form abandoned');
    this.setupLoaded = false;
  }

  getServiceSetup(id: string): Fields {
    return this.currentServiceFields;
  }

  resetFieldValuesToDefaults(): void {
    if (this.currentServiceSetup.length === 0) return;

    this.currentServiceSetup.forEach(field => {
      field.value = field.DefaultValue || '';
    });

    this.currentServiceFields.Parameters.forEach(field => {
      field.value = field.DefaultValue || '';
    });

    this.emitUpdate();
  }
}

