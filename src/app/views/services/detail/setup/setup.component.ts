import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ServiceSetupService, Field, Fields } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class SetupComponent implements OnInit, AfterViewChecked {
  get serviceSetupFields(): Fields {
    return this.serviceSetup.currentServiceFields;
  }

  serviceId = '';
  formGroup = this.fb.group({});
  fieldsWithValues: Field[] = [];
  allowEdit = true;
  changesSaved = false;
  formValuesChanged = false;

  showCreateNewRun = true;

  constructor(
    public serviceSetup: ServiceSetupService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public uiState: UiStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.parent!.params.subscribe(params => {
      this.serviceId = params['id'];
      this.uiState.setIdServiceDetailId(params['id']);
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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

    this.fieldsWithValues = this.serviceSetup.currentServiceFields.Parameters.map((field, index) => {
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

