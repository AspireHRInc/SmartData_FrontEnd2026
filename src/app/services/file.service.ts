import { Injectable } from '@angular/core';

export interface File {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  createDate?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}
}
