import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstanceRoutingModule } from './instance-routing.module';
import { InstanceComponent } from './instance/instance.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InstanceComponent
  ],
  imports: [
    CommonModule,
    InstanceRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InstanceModule { }
