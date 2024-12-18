import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Scheduling } from '@models/Scheduling';
import { UserRole } from '@models/user';
import { ScheduleService } from '@services/schedule.service';
import { SessionService } from '@store/session.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss'
})
export class LibraryCardComponent implements OnInit {

  schedules: Scheduling[] = [];

  isAdmin: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  instance_id: string;

  @Output()
  onCardClick: EventEmitter<Scheduling> = new EventEmitter();

  @Output()
  onDeleteClick: EventEmitter<number> = new EventEmitter();
  
    public pageControl: PageControl = {
      take: 10,
      page: 1,
      itemCount: 0,
      pageCount: 0,
      orderField: "id",
      order: Order.DESC,
    };

  constructor(
    private readonly _scheduleService: ScheduleService,
    private readonly _toastrService: ToastrService,
    private readonly _sessionService: SessionService
  ){}

  ngOnInit(): void {
    this.getSchedule();
    this.loadPermissions();
  }

    ngOnChanges(changes: SimpleChanges): void {
      const { loading} = changes;
  
      if (!loading?.currentValue) {
        this.getSchedule();
      }
    }

  loadPermissions(){
    this._sessionService.getUser()
    .subscribe(user => {
        if(user.role === UserRole.Admin) this.isAdmin = true;
    });
  }

  getSchedule(){
    this.loading = true;
    const filters = {instance_id: this.instance_id, status: 'Model'};
    this._scheduleService.search(this.pageControl, filters)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        this.schedules = res.data;        
      },
      error: (error) => {
        console.log(error.error.message);
      }
    })
  }

  processText(text: string): string {
    return text
      .replace(/\n/g, '<br>') // Quebra de linha
      .replace(/\*(.*?)\*/g, '<b>$1</b>') // Negrito
      .replace(/~(.*?)~/g, '<s>$1</s>')   // Cortado
      .replace(/_(.*?)_/g, '<i>$1</i>');  // Itálico
  }

  delete(id, event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.onDeleteClick.emit(id)
  }

  editLibrary(schedule){
    this.onCardClick.emit({
      ...schedule,
      edit: true
    })
  }
  
}