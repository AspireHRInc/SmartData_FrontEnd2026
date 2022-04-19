import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, InputsModule, LabelModule, ButtonsModule],
  exports: [InputsModule, LabelModule, ButtonsModule],
  declarations: [],
})
export class KendoModule {}
