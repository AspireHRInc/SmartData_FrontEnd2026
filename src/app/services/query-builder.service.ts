import { Injectable } from '@angular/core';

export interface QueryFilters {
  status?: string[];
  partition?: string;
  objectType?: string;
  owner?: string;
  lastModifiedFrom?: string;
  lastModifiedTo?: string;
  referencedObjectKey?: string;
  custom?: string;
}

@Injectable({
  providedIn: 'root',
})
export class QueryBuilderService {

  /**
   * Builds a PartiQL-compatible filter query string.
   * Filters are joined with ' AND '.
   */
  build(filters: QueryFilters): string {
    const parts: string[] = [];

    // Status filter: "status" IN ['Completed','Processing']
    if (filters.status && filters.status.length > 0) {
      const statusValues = filters.status.map(s => `'${s}'`).join(',');
      parts.push(`"status" IN [${statusValues}]`);
    }

    // Partition filter: "PK" = 'Org#...'
    if (filters.partition) {
      parts.push(`"PK" = '${filters.partition}'`);
    }

    // Object Type filter: begins_with("SK", 'Process')
    if (filters.objectType) {
      parts.push(`begins_with("SK", '${filters.objectType}')`);
    }

    // Owner filter: "owner" = 'user@email.com'
    if (filters.owner) {
      parts.push(`"owner" = '${filters.owner}'`);
    }

    // Last Modified From: "lastModifiedAt" >= '2025-01-01T00:00:00Z'
    if (filters.lastModifiedFrom) {
      parts.push(`"lastModifiedAt" >= '${filters.lastModifiedFrom}'`);
    }

    // Last Modified To: "lastModifiedAt" <= '2025-12-31T23:59:59Z'
    if (filters.lastModifiedTo) {
      parts.push(`"lastModifiedAt" <= '${filters.lastModifiedTo}'`);
    }

    // Referenced Objects: contains("referencedObjects"."ssObjectKey", 'ScheduledProcess#...')
    if (filters.referencedObjectKey) {
      parts.push(`contains("referencedObjects"."ssObjectKey", '${filters.referencedObjectKey}')`);
    }

    // Custom filter: appended directly
    if (filters.custom) {
      parts.push(filters.custom);
    }

    return parts.join(' AND ');
  }

  /**
   * Builds an owner-only query
   */
  buildOwnerQuery(email: string): string {
    return this.build({ owner: email });
  }

  /**
   * Builds a query for process runs filtered by owner and object type
   */
  buildProcessRunQuery(email: string, statuses?: string[]): string {
    return this.build({
      owner: email,
      objectType: 'Process',
      status: statuses
    });
  }

  /**
   * Builds a query for runs of a specific scheduled process
   */
  buildByReferencedProcess(email: string, scheduledProcessKey: string): string {
    return this.build({
      owner: email,
      objectType: 'Process',
      referencedObjectKey: scheduledProcessKey
    });
  }
}
