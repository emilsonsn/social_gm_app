import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryCardComponent } from './library-card/library-card.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryCardRoutingModule { }
