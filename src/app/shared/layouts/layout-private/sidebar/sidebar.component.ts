import {Component, Input} from '@angular/core';
import {IMenuItem} from "@models/ItemsMenu";
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() menuItem: IMenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-house',
      route: '/painel/home',
      active: true,
    },
  ]

  constructor(
    protected readonly _sidebarService : SidebarService
  ) {}

  public toggleShowSidebar() {
    this._sidebarService.showSidebar.set(false);
  }

}
