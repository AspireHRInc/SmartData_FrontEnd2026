import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CanComponentDeactivate } from 'src/app/services/can-deactivate-guard.service';
import { ServiceSetupService, Field, Fields } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class SetupComponent implements OnInit, AfterViewChecked, CanComponentDeactivate {
  serviceSetupFields: Fields = new Fields();
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
    });

    this.serviceSetupFields = this.serviceSetup.getServiceSetup(this.serviceId);
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

  onSubmit(formResults: FormGroup) {
    this.fieldsWithValues = this.serviceSetup.currentServiceFields.Parameters.map(field => {
      return { ...field, value: this.formGroup.value[field.ParameterName] };
    });
    this.changesSaved = true;
    this.serviceSetup.currentServiceSetup = this.fieldsWithValues;
    this.router.navigate(['confirm'], { relativeTo: this.route.parent });
  }

  onAbortFile(fileName: string) {
    this.serviceSetup.onFileRemove(fileName);
  }
}
