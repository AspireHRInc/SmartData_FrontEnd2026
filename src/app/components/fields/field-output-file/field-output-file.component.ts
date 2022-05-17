import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/services/service-setup.service';

@Component({
  selector: 'ss-field-output-file',
  templateUrl: './field-output-file.component.html',
  styleUrls: ['./field-output-file.component.less'],
})
export class FieldOutputFileComponent implements OnInit {
  @Input() parameters!: Field;

  constructor() {}

  ngOnInit(): void {}
}
