import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@models/application';
import { Scheduling } from '@models/Scheduling';
import { ScheduleService } from '@services/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss'
})
export class LibraryCardComponent implements OnInit {

  schedules: Scheduling[] = [];

  @Input()
  loading: boolean = false;

  @Input()
  instance_id: string;

  @Output()
  onCardClick: EventEmitter<Scheduling> = new EventEmitter();

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
  ){}

  ngOnInit(): void {
    this.getSchedule();
  }

    ngOnChanges(changes: SimpleChanges): void {
      const { loading} = changes;
  
      if (!loading?.currentValue) {
        this.getSchedule();
      }
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
  
}