import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageTriggeringRoutingModule } from './message-triggering-routing.module';
import { MessageTriggeringComponent } from './message-triggering/message-triggering.component';
import { ContactListComponent } from './message-triggering/contact-list/contact-list.component';
import { TriggeringComponent } from './message-triggering/triggering/triggering.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MessageTriggeringComponent,
    ContactListComponent,
    TriggeringComponent
  ],
  imports: [
    CommonModule,
    MessageTriggeringRoutingModule,
    SharedModule,
    MatTabsModule
  ]
})
export class MessageTriggeringModule { }
