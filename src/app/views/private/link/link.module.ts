import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkRoutingModule } from './link-routing.module';
import { LinkComponent } from './link/link.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    LinkComponent
  ],
  imports: [
    CommonModule,
    LinkRoutingModule,
    SharedModule
  ]
})
export class LinkModule { }
