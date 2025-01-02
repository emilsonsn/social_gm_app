import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Link } from '@models/link';
import { ContactListService } from '@services/contact_list.service';
import { TriggeringService } from '@services/triggering.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table-triggering',
  templateUrl: './table-triggering.component.html',
  styleUrl: './table-triggering.component.scss'
})
export class TableTriggeringComponent implements OnInit {
  @Input()
  searchTerm?: string = '';

  @Input()
  loading: boolean = false;

  @Input()
  filters: any;

  @Output()
  onLinkClick: EventEmitter<Link> = new EventEmitter<Link>();

  @Output()
  onLinkView: EventEmitter<Link> = new EventEmitter<Link>();

  @Output()
  onDeleteLinkClick: EventEmitter<number> = new EventEmitter<number>();

  public triggerings: any[] = [];

  public columns = [
    {
      slug: "description",
      order: true,
      title: "Descrição",
      align: "text-center",
    },
    {
      slug: "contacts",
      order: true,
      title: "Lista de contatos",
      align: "justify-content-start",
    },
    {
      slug: "notfound_contacts",
      order: true,
      title: "Sem whatsapp",
      align: "justify-content-end",
    },
    {
      slug: "pending_contacts",
      order: true,
      title: "Contatos restantes",
      align: "justify-content-end",
    },
    {
      slug: "remaining_time",
      order: true,
      title: "Tempo restante (minutos)",
      align: "justify-content-end",
    },
    {
      slug: "status",
      order: true,
      title: "Status",
      align: "justify-content-center",
    },
    {
      slug: "",
      order: true,
      title: "Ações",
      align: "justify-content-end",
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
    private readonly _triggeringService: TriggeringService
  ) {}

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { filters, searchTerm, loading, instance_id} = changes;

    if ( searchTerm?.previousValue && searchTerm?.currentValue !== searchTerm?.previousValue ) {
      this._onSearch();
    }
    else if (!loading?.currentValue) {
      this._onSearch();
    }
    else if ( filters?.previousValue && filters?.currentValue !== filters?.previousValue ) {
			this._onSearch();
		}
  }

  private _initOrStopLoading(): void {
    this.loading = !this.loading;
  }

  get getLoading() {
    return !!this.loading;
  }

  private _onSearch() {
    this.pageControl.search_term = this.searchTerm || '';
    this.pageControl.page = 1;
    this.search();
  }

  search(): void {
    this._initOrStopLoading();

    this._triggeringService
      .search(this.pageControl, {        
        ...this.filters
      })
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe((res) => {
        this.triggerings = res.data;

        this.pageControl.page = res.current_page;
        this.pageControl.itemCount = res.total;
        this.pageControl.pageCount = res.last_page;
      });
  }

  onClickOrderBy(slug: string, order: boolean) {
    if (!order) {
      return;
    }

    if (this.pageControl.orderField === slug) {
      this.pageControl.order =
        this.pageControl.order === Order.ASC ? Order.DESC : Order.ASC;
    } else {
      this.pageControl.order = Order.ASC;
      this.pageControl.orderField = slug;
    }
    this.pageControl.page = 1;
    this.search();
  }

  pageEvent($event: any) {
    this.pageControl.page = $event.pageIndex + 1;
    this.pageControl.take = $event.pageSize;
    this.search();
  }
}
