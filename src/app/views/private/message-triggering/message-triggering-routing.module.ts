import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageTriggeringComponent } from './message-triggering/message-triggering.component';

const routes: Routes = [
  {
    path: '',
    component: MessageTriggeringComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTriggeringRoutingModule { }
