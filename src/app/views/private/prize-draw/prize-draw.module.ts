import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrizeDrawRoutingModule } from './prize-draw-routing.module';
import { PrizeDrawComponent } from './prize-draw/prize-draw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PrizeDrawComponent
  ],
  imports: [
    CommonModule,
    PrizeDrawRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    SharedModule
  ]
})
export class PrizeDrawModule { }
