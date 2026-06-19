import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { ServiceSetupService, Field, Fields } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class SetupComponent implements OnInit, OnDestroy, AfterViewChecked {
  serviceSetupFields: Fields = new Fields();

  serviceId = '';
  formGroup = this.fb.group({});
  fieldsWithValues: Field[] = [];
  allowEdit = true;
  changesSaved = false;
  formValuesChanged = false;

  showCreateNewRun = true;

  private destroy$ = new Subject<void>();

  constructor(
    public serviceSetup: ServiceSetupService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public uiState: UiStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Unlock setup and reset field values to defaults when entering the form
    this.serviceSetup.unlockSetup();
    this.serviceSetup.resetFieldValuesToDefaults();

    this.route.parent!.params.subscribe(params => {
      this.serviceId = params['id'];
      this.uiState.setIdServiceDetailId(params['id']);
    });

    // Subscribe to reactive field updates from the service
    this.serviceSetup.serviceFields$
      .pipe(takeUntil(this.destroy$))
      .subscribe(fields => {
        this.serviceSetupFields = fields;
        this.changeDetectorRef.markForCheck();
      });

    // Safety net: if service already has data, use it directly
    if (this.serviceSetup.isSetupLoaded && this.serviceSetup.currentServiceFields.Parameters.length > 0) {
      this.serviceSetupFields = this.serviceSetup.currentServiceFields;
    }
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  detailsClose() {
    this.uiState.hideServiceDetail();
  }

  showInfo() {
    this.uiState.showServiceDetail();
  }

  onSubmit(formResults: any) {
    let formValues: any = {};

    if (formResults?.controls) {
      Object.keys(formResults.controls).forEach(key => {
        formValues[key] = formResults.controls[key].value;
      });
    } else if (formResults?.value) {
      formValues = formResults.value;
    } else {
      formValues = formResults || {};
    }

    this.fieldsWithValues = this.serviceSetupFields.Parameters.map((field, index) => {
      const value = formValues[field.ParameterName]
        ?? formValues[field.Caption]
        ?? formValues[index]
        ?? formValues[`field_${index}`]
        ?? field.value
        ?? field.DefaultValue
        ?? '';
      return { ...field, value };
    });

    this.changesSaved = true;
    this.serviceSetup.currentServiceSetup = this.fieldsWithValues;
    this.serviceSetup.lockSetup();
    this.router.navigate(['confirm'], { relativeTo: this.route.parent });
  }

  onAbortFile(fileName: string) {
    this.serviceSetup.onFileRemove(fileName);
  }
}

