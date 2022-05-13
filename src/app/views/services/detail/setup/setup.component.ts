import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceSetupService } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less'],
})
export class SetupComponent implements OnInit, AfterViewChecked {
  serviceId = '';
  formGroup = this.fb.group({});

  constructor(
    private route: ActivatedRoute,
    public serviceSetup: ServiceSetupService,
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public uiState: UiStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent!.params.subscribe(params => {
      this.serviceId = params['id'];
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

  onSubmit(formResults: FormGroup) {
    console.log(formResults);
    this.serviceSetup.currenctServiceSetup = formResults.value;
    this.router.navigate(['confirm'], { relativeTo: this.route.parent });
  }

  onAbortFile(fileName: string) {
    this.serviceSetup.onFileRemove(fileName);
  }
}
