import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Link } from '@models/link';
import { User } from '@models/user';
import { ContactListService } from '@services/contact_list.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table-contacts',
  templateUrl: './table-contacts.component.html',
  styleUrl: './table-contacts.component.scss'
})
export class TableContactsComponent implements OnInit {
  @Input()
  searchTerm?: string = '';

  @Input()
  loading: boolean = false;

  @Input()
  filters: any;

  @Input()
  public contacts: any[] = [];

  public columns = [
    {
      slug: "name",
      order: true,
      title: "Nome",
      align: "justify-content-center",
    },
    {
      slug: "phone",
      order: true,
      title: "Telefone",
      align: "justify-content-center",
    },
    {
      slug: "is_whatsapp",
      order: true,
      title: "Tem whatsapp",
      align: "justify-content-center",
    },
  ];

  public pageControl: PageControl = {
    take: 10,
    page: 1,
    itemCount: 0,
    pageCount: 0,
    orderField: "id",
    order: Order.ASC,
  };

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _contactListService: ContactListService
  ) {}

  ngOnInit(){
  }


  private _initOrStopLoading(): void {
    this.loading = !this.loading;
  }

  get getLoading() {
    return !!this.loading;
  }


}
