import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconLogoDarkComponent } from './icon-logo-dark/icon-logo-dark.component';
import { IconLogoLightComponent } from './icon-logo-light/icon-logo-light.component';
import { IconStarComponent } from './icon-star/icon-star.component';
import { IconFileWStatusDotComponent } from './icon-file-w-status-dot/icon-file-w-status-dot.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IconLogoDarkComponent, IconLogoLightComponent, IconStarComponent, IconFileWStatusDotComponent],
  exports: [IconLogoDarkComponent, IconLogoLightComponent, IconStarComponent, IconFileWStatusDotComponent],
})
export class IconsModule {}
