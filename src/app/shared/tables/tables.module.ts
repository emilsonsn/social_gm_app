import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconButton } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { PipesModule } from '@shared/pipes/pipes.module';
import { TableUserComponent } from './table-users/table-users.component';
import {SharedModule} from "@shared/shared.module";
import {AvatarModule} from "@shared/components/avatar/avatar.module";
import { TableSchedulingComponent } from './table-scheduling/table-scheduling.component';
import { TableLinkComponent } from './table-link/table-link.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TablePrizeDrawComponent } from './table-prize-draw/table-prize-draw.component';
import { TableContactListComponent } from './table-contact-list/table-contact-list.component';
import { TableContactsComponent } from './table-contacts/table-contacts.component';
import { TableTriggeringComponent } from './table-triggering/table-triggering.component';

const tables = [
  TableUserComponent,
  TableSchedulingComponent,
  TableLinkComponent,
  TablePrizeDrawComponent,
  TableContactListComponent,
  TableContactsComponent,
  TableTriggeringComponent
]

@NgModule({
  declarations: [
    tables,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconButton,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    PipesModule,
    AvatarModule,
    MatTooltipModule
  ],
  exports: [
    tables
  ],
})
export class TablesModule { }
