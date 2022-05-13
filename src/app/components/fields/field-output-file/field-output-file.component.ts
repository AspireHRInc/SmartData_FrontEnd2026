import { Component, OnInit, Input } from '@angular/core';
import { field } from 'src/app/services/service-setup.service';

@Component({
  selector: 'ss-field-output-file',
  templateUrl: './field-output-file.component.html',
  styleUrls: ['./field-output-file.component.less'],
})
export class FieldOutputFileComponent implements OnInit {
  @Input() parameters!: field;

  constructor() {}

  ngOnInit(): void {}
}
