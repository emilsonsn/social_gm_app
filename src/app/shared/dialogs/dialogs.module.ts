import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsModule} from '@shared/components/components.module';
import {DirectivesModule} from '@shared/directives/directives.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {PipesModule} from '@shared/pipes/pipes.module';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {MatRippleModule} from '@angular/material/core';
import {NgxMaskDirective, NgxMaskPipe} from 'ngx-mask';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {TablesModule} from '@shared/tables/tables.module';
import {MatIcon} from "@angular/material/icon";
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { DialogInstanceComponent } from './dialog-instance/dialog-instance.component';
import { DialogScheduleComponent } from './dialog-schedule/dialog-schedule.component';
import { DialogLinkComponent } from './dialog-link/dialog-link.component';
import { DialogAutomationComponent } from './dialog-automation/dialog-automation.component';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogPrizeDrawComponent } from './dialog-prize-draw/dialog-prize-draw.component';
import { DialogDrawnsComponent } from './dialog-drawns/dialog-drawns.component';
import { DialogContactListComponent } from './dialog-contact-list/dialog-contact-list.component';
import { DialogTriggeringComponent } from './dialog-triggering/dialog-triggering.component';

@NgModule({
  declarations: [
    DialogInstanceComponent,
    DialogScheduleComponent,
    DialogLinkComponent,
    DialogAutomationComponent,
    DialogUserComponent,
    DialogPrizeDrawComponent,
    DialogDrawnsComponent,
    DialogContactListComponent,
    DialogTriggeringComponent
  ],
  imports: [
    CommonModule,
    TablesModule,
    ComponentsModule,
    DirectivesModule,
    ClipboardModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    MatRippleModule,
    TextFieldModule,
    CdkTextareaAutosize,
    CurrencyMaskModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxMatSelectSearchModule,
    MatIcon,
  ]
})
export class DialogsModule {
}
