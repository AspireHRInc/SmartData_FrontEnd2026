
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService, ServiceRun } from 'src/app/services/service-run.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceSetupService } from 'src/app/services/service-setup.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ss-service-run-results',
  templateUrl: './service-run-results.component.html',
  styleUrls: ['./service-run-results.component.less'],
})
export class ServiceRunResultsComponent implements OnInit {
  @Input() serviceId = '';

  localServiceRun: ServiceRun = new ServiceRun();
  results: any[] = [];
  outputResults: any[] = [];
  loading = true;
  error = '';

  taskName = '';
  status = '';
  createdDate = '';
  lastModifiedDate = '';
  lastModifiedBy = '';
  successCount = 0;
  errorCount = 0;
  userErrorCount = 0;

  private apiBase = environment.apiUrl;

  constructor(
    public uiState: UiStateService,
    private serviceRunService: ServiceRunService,
    private http: HttpClient,
    private authService: AuthService,
    private serviceSetupService: ServiceSetupService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = '';

    const localRun = this.serviceRunService.getResultsForRun(this.serviceId);

    this.serviceRunService.getProcessDetails(this.serviceId).subscribe(
      (response: any) => {
        const items = response.Items || [];
        if (items.length > 0) {
          const item = items[0];
          console.log('Full process detail item:', item);

          this.taskName = item.name || '';
          this.status = item.status || '';
          this.createdDate = this.formatLocalDate(item.created || item.createdAt || '');
          this.lastModifiedDate = this.formatLocalDate(item.lastModifiedAt || '');
          this.lastModifiedBy = item.lastModifiedBy || '';
          this.successCount = item.successCount || 0;
          this.errorCount = item.errorCount || 0;
          this.userErrorCount = item.userErrorCount || 0;

          // Extract process UUID from the item SK for download use
          const itemSk = item.SK || '';
          const extractedProcessUuid = itemSk.includes('#')
            ? itemSk.split('#')[1]
            : itemSk.replace('Process#', '');

          const inputParams = item.inputParameters || [];
          this.results = inputParams
            .filter((p: any) => p.name !== 'Comment')
            .map((p: any) => ({
              id: p.name,
              type: 'parameter',
              label: p.parameterMetadata?.caption || p.name,
              textResult: p.value || p.defaultValue || ''
            }));

          const outputParams = item.outputParameters || [];
          this.outputResults = outputParams
            .map((p: any) => {
              const paramType = (p.parameterMetadata?.parameterType || '').toLowerCase();
              const value = p.value || p.defaultValue || '';

              // Detect if this output parameter is a file
              const isFile = paramType === 'file' ||
                             paramType === 'outputfile' ||
                             paramType === 'outputfiletemplate';

              return {
                id: p.name,
                type: isFile ? 'file' : 'parameter',
                label: p.parameterMetadata?.caption || p.name,
                textResult: value,
                processUuid: extractedProcessUuid || this.serviceId,
                downloading: false
              };
            });

          if (localRun) {
            this.localServiceRun = localRun;
          }
        }
        this.loading = false;
      },
      (err: any) => {
        console.error('Error fetching process details:', err);
        this.error = 'Failed to load results.';
        this.loading = false;
      }
    );
  }

  /**
   * Downloads an output file from S3 via presigned URL, then decrypts it.
   * Uses GET /Process/{uuid}/Document/OutPutFile to get presigned download URL.
   * The S3 object key is always 'OutPutFile' regardless of the logical filename.
   */
  downloadOutputFile(result: any): void {
    if (result.downloading) return;

    result.downloading = true;

    const headers = this.getHeaders();
    const processUuid = result.processUuid || this.serviceId;

    console.log('Downloading output file:', { processUuid });

    // GET presigned download URL — the S3 object is always named 'OutPutFile'
    this.http.get(
      `${this.apiBase}/Process/${processUuid}/Document/OutPutFile`,
      { headers, responseType: 'text' }
    ).subscribe(
      (presignedUrl: string) => {
        const cleanUrl = presignedUrl.replace(/^"|"$/g, '').trim();
        console.log('Got presigned download URL:', cleanUrl);

        // Download the encrypted zip from S3
        this.http.get(cleanUrl, { responseType: 'blob' }).subscribe(
          (blob: Blob) => {
            // Decrypt and trigger browser download
            this.serviceSetupService.decryptFile(blob).then(decryptedFiles => {
              for (const file of decryptedFiles) {
                this.serviceSetupService.downloadDecryptedFile(file.data, file.filename);
              }
              result.downloading = false;
            }).catch(err => {
              console.error('Decryption failed, downloading raw file:', err);
              // Fallback: download the raw zip if decryption fails
              this.downloadBlobDirect(blob, 'OutPutFile.zip');
              result.downloading = false;
            });
          },
          (err) => {
            console.error('S3 download failed:', err);
            result.downloading = false;
          }
        );
      },
      (err) => {
        console.error('Failed to get presigned URL:', err);
        result.downloading = false;
      }
    );
  }

  /**
   * Fallback: direct blob download without decryption
   */
  private downloadBlobDirect(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private getHeaders(): HttpHeaders {
    const idToken = this.authService.getIdToken();

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

  formatLocalDate(value: any): string {
    if (!value) return '';
    let dateStr = String(value).trim();
    if (dateStr && !dateStr.endsWith('Z') && !dateStr.match(/[+-]\d{2}:\d{2}$/) && !dateStr.match(/[+-]\d{4}$/)) {
      dateStr += 'Z';
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${month} ${day}, ${year}, ${displayHours}:${minutes}:${seconds} ${ampm}`;
  }

  close() {
    this.uiState.hideServiceRunResults();
  }

  onButtonClick(filePath: string) {
    if (!filePath) return;
    window.open(filePath, '_blank');
  }

  downloadResults() {
    if (this.results.length === 0 && this.outputResults.length === 0) return;

    const newline = String.fromCharCode(13) + String.fromCharCode(10);
    const lines: string[] = [];

    if (this.results.length > 0) {
      lines.push('"--- Input Parameters ---",""');
      this.results.forEach(r => lines.push(`"${r.label}","${r.textResult}"`));
    }

    if (this.outputResults.length > 0) {
      lines.push('"--- Output Parameters ---",""');
      this.outputResults.forEach(r => lines.push(`"${r.label}","${r.textResult}"`));
    }

    const csvContent = 'Parameter,Value' + newline + lines.join(newline);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `results-${this.serviceId}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

