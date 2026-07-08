import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, filter, debounceTime } from 'rxjs/operators';

import { ServiceSetupService, Field, Fields } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class SetupComponent implements OnInit, OnDestroy {
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

  isReady = false;

  ngOnInit(): void {
    // Unlock setup so the form can render
    this.serviceSetup.unlockSetup();
    // Only reset to defaults if entering fresh (no prior user values saved)
    /*const hasSavedValues = this.serviceSetup.currentServiceSetup.some(f => f.value !== undefined && f.value !== '');
    if (!hasSavedValues) {
      this.serviceSetup.resetFieldValuesToDefaults();
    }*/
    //if user has previously entered values we restore them if they hit the back arrow
    if(this.serviceSetup.currentServiceSetup.length > 0){
      this.serviceSetup.currentServiceSetup.forEach(saved => {
        const match = this.serviceSetup.currentServiceFields.Parameters.find(p => p.ParameterName === saved.ParameterName);
        if (match) match.value = saved.value;
      });
    } 
    else {
      this.serviceSetup.resetFieldValuesToDefaults();
    }

    this.route.parent!.params.subscribe(params => {
      this.serviceId = params['id'];
      this.uiState.setIdServiceDetailId(params['id']);
    });

    // Subscribe to reactive field updates from the service
    this.serviceSetup.serviceFields$
      .pipe(takeUntil(this.destroy$), filter(fields => fields.Parameters.length > 0), debounceTime(50),)
      .subscribe(fields => {
        this.serviceSetupFields = fields;
        //this.changeDetectorRef.markForCheck();
        setTimeout(() => {
          this.isReady = true;
          this.changeDetectorRef.markForCheck();
        }, 50);
      });

    // Safety net: if service already has data, use it directly
    if (this.serviceSetup.isSetupLoaded && this.serviceSetup.currentServiceFields.Parameters.length > 0) {
      this.serviceSetupFields = this.serviceSetup.currentServiceFields;
    }
  }

  /*ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }*/

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

