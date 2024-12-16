import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebChatLayoutComponent} from './web-chat-layout/web-chat-layout.component';

import {RouterOutlet} from "@angular/router";

import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatBadge} from "@angular/material/badge";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  WebChatSidebarComponent
} from "@app/views/private/web-chat/web-chat-layout/web-chat-sidebar/web-chat-sidebar.component";
import {WebChatComponentsModule} from "@app/views/private/web-chat/web-chat-components/web-chat-components.module";

@NgModule({
  declarations: [
    WebChatLayoutComponent,
    WebChatSidebarComponent
  ],
  imports: [
    CommonModule,
    WebChatComponentsModule,
    RouterOutlet,
    MatTab,
    MatTabGroup,
    MatBadge,
    MatTabLabel,
    FormsModule,
    MatLabel,
    MatFormField,
    MatInput
  ]
})
export class WebChatLayoutModule {
}
