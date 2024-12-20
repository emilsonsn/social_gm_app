import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {IMenuItem} from "@models/ItemsMenu";
import {SidebarService} from '@services/sidebar.service';
import {Subscription} from "rxjs";
import {User} from "@models/user";
import {UserService} from "@services/user.service";
import {ApiResponse} from "@models/application";
import { SessionService } from '@store/session.service';
import { SessionQuery } from '@store/session.query';

@Component({
  selector: 'app-layout-private',
  templateUrl: './layout-private.component.html',
  styleUrl: './layout-private.component.scss'
})
export class LayoutPrivateComponent implements OnInit {

  public permitedMenuItem: IMenuItem[] = [];

  public menuItem: IMenuItem[] = [
    {
      label: 'Instâncias',
      icon: 'fa-solid fa-house',
      route: '/painel/home',
      active: true
    },
    {
      label: 'Links',
      icon: 'fa-solid fa-link',
      route: '/painel/link',
      active: true
    },
    {
      label: 'Webchat',
      icon: 'fa-brands fa-whatsapp',
      route: '/painel/web-chat'
    },
    {
      label: 'Sorteio',
      icon: 'fa-solid fa-award',
      route: '/painel/prize-draw'
    },
    {
      label: 'Usuários',
      icon: 'fa-solid fa-users',
      route: '/painel/collaborator'
    }
  ]

  protected isMobile: boolean = window.innerWidth >= 1000;
  private resizeSubscription: Subscription;
  user: User;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private readonly _sidebarService: SidebarService,
    private readonly _userService: UserService,
    private readonly _sessionService: SessionService,
    private readonly _sessionQuery : SessionQuery
  ) { }
 
  ngOnInit(): void {
    document.getElementById('template').addEventListener('click', () => {
      this._sidebarService.retractSidebar();
    });
  
    this._sessionQuery.user$.subscribe(user => {
      if (user) {
        this.user = user;
  
        if (user.role !== 'Admin') {
          this.menuItem = this.menuItem.filter(item => item.label !== 'Usuários');
        }
  
        this.permitedMenuItem = this.menuItem;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}
