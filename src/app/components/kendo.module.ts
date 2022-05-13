import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';

import { UploadsModule } from '@progress/kendo-angular-upload';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    DropDownsModule,
    DialogsModule,
    UploadsModule,
    ListViewModule,
    ProgressBarModule,
    PopupModule,
    DateInputsModule,
    TooltipsModule,
  ],
  exports: [
    InputsModule,
    LabelModule,
    ButtonsModule,
    DropDownsModule,
    DialogsModule,
    UploadsModule,
    ListViewModule,
    ProgressBarModule,
    PopupModule,
    DateInputsModule,
    TooltipsModule,
  ],
  declarations: [],
})
export class KendoModule {}
