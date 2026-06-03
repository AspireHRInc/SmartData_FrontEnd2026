import { Component, OnInit, Input } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService } from 'src/app/services/service-run.service';

@Component({
  selector: 'ss-service-run-results',
  templateUrl: './service-run-results.component.html',
  styleUrls: ['./service-run-results.component.less'],
})
export class ServiceRunResultsComponent implements OnInit {
  @Input() serviceId = '';
  results: any;
  loading = true;
  error = '';

  close(): void {
    this.uiState.hideServiceRunResults();
  }

  constructor(public uiState: UiStateService, private serviceRunService: ServiceRunService) {}

  ngOnInit(): void {
    // First try to get results from the already-loaded list
    const localRun = this.serviceRunService.serviceRuns.find(
      serviceRun => serviceRun.id === this.serviceId
    );

    if (localRun && localRun.results && localRun.results.length > 0) {
      this.results = localRun.results;
      this.loading = false;
      console.log('Results from local cache:', this.results);
    } else {
      // Fetch full details from the API
      this.serviceRunService.getProcessDetails(this.serviceId).subscribe({
        next: (response) => {
          console.log('Process details response:', response);
          const items = response.Items || [];
          if (items.length > 0) {
            const processItem = items[0];
            this.results = this.buildResultsFromItem(processItem);
          } else {
            this.results = [];
            this.error = 'No details found for this process run.';
          }
          this.loading = false;
          console.log('Mapped results:', this.results);
        },
        error: (err) => {
          console.error('Error fetching process details:', err);
          this.error = 'Failed to load results. Please try again.';
          this.results = [];
          this.loading = false;
        }
      });
    }
  }

  private buildResultsFromItem(item: any): any[] {
    const results: any[] = [];

    // Status
    if (item.status) {
      results.push({
        id: 'status',
        type: 'info',
        label: 'Status',
        textResult: item.status
      });
    }

    // Process Name
    if (item.name) {
      results.push({
        id: 'name',
        type: 'info',
        label: 'Process Name',
        textResult: item.name
      });
    }

    // Owner
    if (item.owner) {
      results.push({
        id: 'owner',
        type: 'info',
        label: 'Owner',
        textResult: item.owner
      });
    }

    // Submitted
    if (item.created || item.lastModifiedAt) {
      results.push({
        id: 'submitted',
        type: 'info',
        label: 'Submitted',
        textResult: new Date(item.created || item.lastModifiedAt).toLocaleString()
      });
    }

    // Last Updated
    if (item.lastModifiedAt) {
      results.push({
        id: 'lastUpdated',
        type: 'info',
        label: 'Last Updated',
        textResult: new Date(item.lastModifiedAt).toLocaleString()
      });
    }

    // Input parameters (if they exist on the item)
    if (item.inputParameters && item.inputParameters.length > 0) {
      item.inputParameters.forEach((param: any) => {
        results.push({
          id: param.name,
          type: 'parameter',
          label: param.parameterMetadata?.caption || param.name,
          textResult: param.value || param.defaultValue || ''
        });
      });
    }

    // Execution results (if the lambda stores them)
    if (item.results && Array.isArray(item.results)) {
      item.results.forEach((r: any) => results.push(r));
    }
    if (item.outputResults && Array.isArray(item.outputResults)) {
      item.outputResults.forEach((r: any) => results.push(r));
    }

    // Output files
    if (item.outputFiles && Array.isArray(item.outputFiles)) {
      item.outputFiles.forEach((file: any) => {
        results.push({
          id: file.fileName || file.name,
          type: 'file',
          label: file.fileName || file.name || 'Output File',
          fileName: file.fileName || file.name,
          filePath: file.filePath || file.path || file.s3Path
        });
      });
    }

    return results;
  }

  cancel() {
    this.uiState.hideCancelServiceRun();
  }

  onButtonClick(filePath: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', filePath);
    link.setAttribute('download', filePath.split('/').pop() || 'download');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
