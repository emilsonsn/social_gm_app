import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { PrizeDraw, PrizeDrawDrawn } from '@models/PrizeDraw';
import { Scheduling } from '@models/Scheduling';
import { PrizeDrawService } from '@services/prizeDraw.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table-prize-draw',
  templateUrl: './table-prize-draw.component.html',
  styleUrl: './table-prize-draw.component.scss'
})
export class TablePrizeDrawComponent implements OnInit {
  @Input()
  searchTerm?: string = '';

  @Input()
  loading: boolean = false;

  @Input()
  isAdmin: boolean = false;

  @Input()
  isLibrary: boolean = false;

  @Input()
  instance_id: string;

  @Input()
  filters: any;

  @Output()
  onView: EventEmitter<PrizeDrawDrawn[]> = new EventEmitter<PrizeDrawDrawn[]>();
  
  @Output()
  onDeleteClick: EventEmitter<number> = new EventEmitter<number>();

  public prizeDraws: PrizeDraw[] = [];

  public columns = [
    {
      slug: "instance",
      order: false,
      title: "Conta do Whatsapp",
      align: "justify-content-center",
    },
    {
      slug: "prize_name",
      order: false,
      title: "Prêmio",
      align: "justify-content-center",
    },
    {
      slug: "groups_name",
      order: false,
      title: "Grupos",
      align: "justify-content-center",
    },
    {
      slug: "created_at",
      order: false,
      title: "Data do sorteio",
      align: "justify-content-center",
    },
    {
      slug: "",
      order: false,
      title: "Ações",
      align: "justify-content-end",
    },
  ];

  public pageControl: PageControl = {
    take: 10,
    page: 1,
    itemCount: 0,
    pageCount: 0,
    orderField: "datetime",
    order: Order.DESC,
  };

  constructor(
    private readonly _toastr: ToastrService,
    private readonly _prizeDrawService: PrizeDrawService
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
    else if ( instance_id?.currentValue) {
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

    this._prizeDrawService
      .search(this.pageControl, {
        instance_id: this.instance_id ?? '',
        ...this.filters
      })
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe((res) => {
        this.prizeDraws = res.data;
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
