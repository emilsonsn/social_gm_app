import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryCardRoutingModule } from './library-card-routing.module';
import { LibraryCardComponent } from './library-card/library-card.component';
import { ComponentsModule } from "../components.module";
import { LoadingComponent } from '../loading/loading.component';


@NgModule({
  declarations: [
    LibraryCardComponent
  ],
  imports: [
    CommonModule,
    LibraryCardRoutingModule,
    ComponentsModule,    
],
  exports: [LibraryCardComponent]
})
export class LibraryCardModule { }
