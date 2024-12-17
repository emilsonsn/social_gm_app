import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  WebChatPrivateComponent
} from "@app/views/private/web-chat/web-chat-private/web-chat-private/web-chat-private.component";

const routes: Routes = [
  {
    path: '',
    component: WebChatPrivateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebChatPrivateRoutingModule {
}
