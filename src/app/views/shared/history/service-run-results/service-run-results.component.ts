import { Component, OnInit, Input } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService, ServiceRun } from 'src/app/services/service-run.service';

@Component({
  selector: 'ss-service-run-results',
  templateUrl: './service-run-results.component.html',
  styleUrls: ['./service-run-results.component.less'],
})
export class ServiceRunResultsComponent implements OnInit {
  @Input() serviceId = '';

  localServiceRun: ServiceRun = new ServiceRun();
  results: any[] = [];
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

  constructor(
    public uiState: UiStateService,
    private serviceRunService: ServiceRunService
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

          const inputParams = item.inputParameters || [];
          this.results = inputParams
            .filter((p: any) => p.name !== 'Comment')
            .map((p: any) => ({
              id: p.name,
              type: 'parameter',
              label: p.parameterMetadata?.caption || p.name,
              textResult: p.value || p.defaultValue || ''
            }));

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
    if (this.results.length === 0) return;

    const newline = String.fromCharCode(13) + String.fromCharCode(10);
    const lines = this.results.map(r => `"${r.label}","${r.textResult}"`);
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

