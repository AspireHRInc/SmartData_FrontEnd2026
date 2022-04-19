import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconLogoDarkComponent } from './icon-logo-dark/icon-logo-dark.component';
import { IconLogoLightComponent } from './icon-logo-light/icon-logo-light.component';
import { IconStarComponent } from './icon-star/icon-star.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IconLogoDarkComponent, IconLogoLightComponent, IconStarComponent],
  exports: [IconLogoDarkComponent, IconLogoLightComponent, IconStarComponent],
})
export class IconsModule {}
