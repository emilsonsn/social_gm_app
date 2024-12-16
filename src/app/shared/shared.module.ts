import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {PaginatorPtBR} from "./config/paginator";
import {ComponentsModule} from "./components/components.module";
import {DirectivesModule} from "./directives/directives.module";
import {PipesModule} from "./pipes/pipes.module";
import {LayoutsModule} from "@shared/layouts/layouts.module";
import { TablesModule } from './tables/tables.module';
import { DialogsModule } from './dialogs/dialogs.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
    TablesModule,
    DialogsModule,
    MatPaginatorModule

  ],
  exports: [
    ComponentsModule,
    DirectivesModule,
    LayoutsModule,
    PipesModule,
    TablesModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: PaginatorPtBR},
  ],
})
export class SharedModule {
}
