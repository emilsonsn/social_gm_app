import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrizeDrawComponent } from './prize-draw/prize-draw.component';

const routes: Routes = [
  {
    path: "",
    component: PrizeDrawComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrizeDrawRoutingModule { }
