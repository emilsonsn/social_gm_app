import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Scheduling } from '@models/Scheduling';
import { User } from '@models/user';
import { ScheduleService } from '@services/schedule.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-table-scheduling',
  templateUrl: './table-scheduling.component.html',
  styleUrl: './table-scheduling.component.scss'
})
export class TableSchedulingComponent implements OnInit {
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
  onSchedulingClick: EventEmitter<Scheduling> = new EventEmitter<Scheduling>();

  @Output()
  onSchedulingImport: EventEmitter<Scheduling> = new EventEmitter<Scheduling>();

  @Output()
  onSchedulingView: EventEmitter<Scheduling> = new EventEmitter<Scheduling>();
  
  @Output()
  onDeleteSchedulingClick: EventEmitter<number> = new EventEmitter<number>();
 
  @Output()
  onSchedulingCopy: EventEmitter<Scheduling> = new EventEmitter<Scheduling>();
  
  public schedules: Scheduling[] = [];

  public columns = [
    {
      slug: "description",
      order: true,
      title: "Descrição",
      align: "text-center",
    },
    {
      slug: "group_id",
      order: true,
      title: "Grupo",
      align: "text-center",
    },
    {
      slug: "datetime",
      order: true,
      title: "Data e hora de envio",
      align: "text-center",
    },
    {
      slug: "",
      order: true,
      title: "Dia",
      align: "text-center",
    },
    {
      slug: "status",
      order: true,
      title: "Status",
      align: "text-center",
    },
    {
      slug: "",
      order: true,
      title: "Ações",
      align: "text-end",
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
    private readonly _userService: UserService,
    private readonly _scheduleService: ScheduleService
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

    this._scheduleService
      .search(this.pageControl, {
        instance_id: this.instance_id,
        ...this.filters
      })
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe((res) => {
        this.schedules = res.data;
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

  getWeekDay(data: string | Date): string {
    const diasSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
  
    // Converte a data para um objeto Date se for uma string
    const dataObj = typeof data === 'string' ? new Date(data) : data;
  
    // Verifica se a data é válida
    if (isNaN(dataObj.getTime())) {
      throw new Error('Data inválida');
    }
  
    return diasSemana[dataObj.getDay()];
  }
  
  pageEvent($event: any) {
    this.pageControl.page = $event.pageIndex + 1;
    this.pageControl.take = $event.pageSize;
    this.search();
  }
}
