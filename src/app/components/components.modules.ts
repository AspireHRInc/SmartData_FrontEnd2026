// COMMON ANGULAR - common things that our components use
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// KENDO WIDGETS - these are all collected into their own imports.
import { KendoModule } from './kendo.module';

// ICONS - all the icon components we want to make available.
import { IconsModule } from './icons/icons.module';

// COMPONENTS - all the components we want to make available.
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { UserBadgesComponent } from './user-badges/user-badges.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { HeaderComponent } from './header/header.component';
import { TilesTileComponent } from './tiles-tile/tiles-tile.component';
import { TilesSectionComponent } from './tiles-section/tiles-section.component';
import { BadgeComponent } from './badge/badge.component';
import { BadgeListComponent } from './badge-list/badge-list.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, RouterModule, KendoModule, IconsModule],
  declarations: [
    UserBadgeComponent,
    UserBadgesComponent,
    StarRatingComponent,
    HeaderComponent,
    TilesTileComponent,
    TilesSectionComponent,
    BadgeComponent,
    BadgeListComponent,
  ],
  exports: [
    KendoModule,
    IconsModule,
    UserBadgeComponent,
    UserBadgesComponent,
    StarRatingComponent,
    HeaderComponent,
    TilesTileComponent,
    TilesSectionComponent,
    BadgeComponent,
    BadgeListComponent,
  ],
})
export class ComponentsModules {}
