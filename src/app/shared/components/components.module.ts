import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountManagerComponent} from "@shared/components/account-manager/account-manager.component";
import {LottieComponent} from "ngx-lottie";
import {
  SmallInformationCardComponent
} from "@shared/components/small-information-card/small-information-card.component";
import {MatDivider} from "@angular/material/divider";
import {CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import { LoadingComponent } from './loading/loading.component';

const components: any[] = [
  AccountManagerComponent,
  SmallInformationCardComponent,
  LoadingComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    LottieComponent,
    MatDivider,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder
  ],
  exports: components
})
export class ComponentsModule { }
