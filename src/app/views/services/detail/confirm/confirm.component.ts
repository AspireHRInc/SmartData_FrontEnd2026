import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceSetupService, Field } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less'],
})
export class ConfirmComponent implements OnInit {
  currentSetup: Field[] = [];
  formGroup = this.fb.group({
    comment: [''],
  });

  constructor(
    public serviceSetup: ServiceSetupService,
    private uiState: UiStateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.currentSetup = Object.entries(this.serviceSetup.currentServiceSetup);
    this.currentSetup = this.serviceSetup.currentServiceSetup;
  }

  showInfo() {
    this.uiState.showServiceDetail();
  }

  submit() {
    this.serviceSetup;
  }

  onSubmit(event: any) {
    this.serviceSetup.onServiceSubmit(this.formGroup.get('comment')!.value);
    this.router.navigate(['history'], { relativeTo: this.route.parent });
  }
}
