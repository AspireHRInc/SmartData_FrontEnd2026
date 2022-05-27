// COMMON ANGULAR - common things that our components use
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// KENDO WIDGETS - these are all collected into their own imports.
import { KendoModule } from './kendo.module';

// ICONS - all the icon components we want to make available.
import { IconsModule } from './icons/icons.module';
// DIRECTIVES - all directives we
import { DirectivesModule } from '../directives/directives.module';

// COMPONENTS - all the components we want to make available.
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { UserBadgesComponent } from './user-badges/user-badges.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { HeaderComponent } from './header/header.component';
import { TilesTileComponent } from './tiles-tile/tiles-tile.component';
import { TilesSectionComponent } from './tiles-section/tiles-section.component';

import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { FiltersComponent } from './filters/filters.component';
import { NavigationButtonsComponent } from './navigation-buttons/navigation-buttons.component';
import { NavigationButtonComponent } from './navigation-button/navigation-button.component';
import { StatusDotComponent } from './status-dot/status-dot.component';
import { StatusProgressBarComponent } from './status-progress-bar/status-progress-bar.component';
import { ListItemServiceRunComponent } from './list-item-service-run/list-item-service-run.component';
import { FieldTextComponent } from './fields/field-text/field-text.component';
import { FieldFileComponent } from './fields/field-file/field-file.component';
import { FieldSelectComponent } from './fields/field-select/field-select.component';
import { FieldCheckboxComponent } from './fields/field-checkbox/field-checkbox.component';
import { FieldConnectionStringComponent } from './fields/field-connection-string/field-connection-string.component';
import { FieldPasswordComponent } from './fields/field-password/field-password.component';
import { FieldOutputFileComponent } from './fields/field-output-file/field-output-file.component';
import { FieldGroupComponent } from './field-group/field-group.component';

import { FieldDateComponent } from './fields/field-date/field-date.component';
import { CardComponent } from './card/card.component';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    KendoModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [
    UserBadgeComponent,
    UserBadgesComponent,
    StarRatingComponent,
    HeaderComponent,
    TilesTileComponent,
    TilesSectionComponent,
    StatusBadgeComponent,
    FiltersComponent,
    NavigationButtonsComponent,
    NavigationButtonComponent,
    StatusDotComponent,
    StatusProgressBarComponent,
    ListItemServiceRunComponent,
    FieldTextComponent,
    FieldFileComponent,
    FieldSelectComponent,
    FieldCheckboxComponent,
    FieldConnectionStringComponent,
    FieldPasswordComponent,
    FieldOutputFileComponent,
    FieldGroupComponent,
    FieldDateComponent,
    CardComponent,
    MenuComponent,
  ],
  exports: [
    KendoModule,
    IconsModule,
    DirectivesModule,
    UserBadgeComponent,
    UserBadgesComponent,
    StarRatingComponent,
    HeaderComponent,
    TilesTileComponent,
    TilesSectionComponent,
    StatusBadgeComponent,
    FiltersComponent,
    NavigationButtonsComponent,
    NavigationButtonComponent,
    StatusDotComponent,
    StatusProgressBarComponent,
    ListItemServiceRunComponent,
    FieldTextComponent,
    FieldFileComponent,
    FieldSelectComponent,
    FieldCheckboxComponent,
    FieldConnectionStringComponent,
    FieldPasswordComponent,
    FieldOutputFileComponent,
    FieldGroupComponent,
    FieldDateComponent,
    CardComponent,
    MenuComponent,
  ],
})
export class ComponentsModules {}
