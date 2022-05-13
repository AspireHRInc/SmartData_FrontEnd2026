import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldGeneratorDirective } from './field-generator.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FieldGeneratorDirective],
  exports: [FieldGeneratorDirective],
})
export class DirectivesModule {}
