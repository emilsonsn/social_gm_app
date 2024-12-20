import { CollaboratorModule } from './collaborator/collaborator.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPrivateComponent } from "@shared/layouts/layout-private/layout-private.component";
import { SessionService } from '../../store/session.service';
import { permissionGuard } from '@app/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPrivateComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [permissionGuard],
        data: {
          page: 'home'
        }
      },
      {
        path: 'link',
        loadChildren: () => import('./link/link.module').then(m => m.LinkModule),
        canActivate: [permissionGuard],
        data: {
          page: 'link'
        }
      },
      {
        path: 'instance',
        loadChildren: () => import('./instance/instance.module').then(m => m.InstanceModule),        
        data: {
          page: 'instace'
        }
      },
      {
        path: 'web-chat',
        loadChildren: () => import('./web-chat/web-chat.module').then(m => m.WebChatModule),
        canActivate: [permissionGuard],
        data: {
          page: 'collaborator'
        }
      },
      {
        path: 'prize-draw',
        loadChildren: () => import('./prize-draw/prize-draw.module').then(m => m.PrizeDrawModule),
        canActivate: [permissionGuard],
        data: {
          page: 'prize_draw'
        }
      },
      {
        path: 'collaborator',
        loadChildren: () => import('./collaborator/collaborator.module').then(m => m.CollaboratorModule),
        canActivate: [permissionGuard],
        data: {
          page: 'collaborator'
        }
      },
      {
        path: '**',
        redirectTo: 'home',
        canMatch: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {

  constructor(
    private readonly _sessionService: SessionService
  ) {}

}




