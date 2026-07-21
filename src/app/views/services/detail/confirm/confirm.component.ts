
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceSetupService, Field } from 'src/app/services/service-setup.service';
import { ServiceRunService } from 'src/app/services/service-run.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less'],
})
export class ConfirmComponent implements OnInit {
  currentSetup: Field[] = [];
  formGroup = this.fb.group({
    taskName: [''],
  });

  constructor(
    public serviceSetup: ServiceSetupService,
    private serviceRunService: ServiceRunService,
    private uiState: UiStateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentSetup = this.serviceSetup.currentServiceSetup;
  }

  onSubmit(event: any) {
  const taskName = this.formGroup.get('taskName')?.value || '';

  this.serviceRunService.lastExecutedServiceName = this.serviceSetup.currentProcessItem?.name || '';

  this.serviceSetup.executeProcess(taskName).subscribe({
    next: (data) => {
      console.log('Execution response:', data);
      this.serviceSetup.unlockSetup();
      this.serviceRunService.refresh();
      setTimeout(() => this.serviceRunService.refresh(), 5000);
      setTimeout(() => this.serviceRunService.refresh(), 10000);
      setTimeout(() => this.serviceRunService.refresh(), 20000);

      // Navigate AFTER execution completes
      this.router.navigate(['history'], { relativeTo: this.route.parent });
    },
    error: (error) => {
      console.error('Execution error:', error);
      this.serviceSetup.unlockSetup();
      this.uiState.setErrorNotification(String(error.message));
      this.serviceRunService.refresh();
    },
  });
}
}

