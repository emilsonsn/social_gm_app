import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Link } from '@models/link';
import { User } from '@models/user';
import { ContactListService } from '@services/contact_list.service';
import { LinkService } from '@services/link.service';
import { ScheduleService } from '@services/schedule.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table-contact-list',
  templateUrl: './table-contact-list.component.html',
  styleUrl: './table-contact-list.component.scss'
})
export class TableContactListComponent implements OnInit {
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

  public contactLists: any[] = [];

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
      title: "Nª contatos",
      align: "justify-content-end",
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
    private readonly _contactListService: ContactListService
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

    this._contactListService
      .search(this.pageControl, {        
        ...this.filters
      })
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe((res) => {
        this.contactLists = res.data;

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
