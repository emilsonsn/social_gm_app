import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from '@models/user';
import { InstanceService } from '@services/instance.service';
import { ScheduleService } from '@services/schedule.service';
import { DialogAutomationComponent } from '@shared/dialogs/dialog-automation/dialog-automation.component';
import { DialogScheduleComponent } from '@shared/dialogs/dialog-schedule/dialog-schedule.component';
import { SessionService } from '@store/session.service';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.scss'
})
export class InstanceComponent {

  public loading: boolean = true;
  public instance_id: string;
  public form: FormGroup;
  public filters;
  public isAdmin: boolean;
  library: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _sessionService: SessionService,
    private readonly _scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private readonly _toastrService: ToastrService,
    private readonly _formBuilder: FormBuilder,
  ){}
 
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.instance_id = params.get('id');
      this.loading = false;
    });

    this.form = this._formBuilder.group({
      description: [''],
      date: [dayjs().format('YYYY/MM/DD')],
    });
    
    this.filters = {status: 'Waiting,Sent'};

    this.loadPermission();
  }

  loadPermission(){
    this._sessionService.getUser()
    .subscribe(user => {
      this.isAdmin = user.role === UserRole.Admin;
    })
  }

  setLybrary(){
    this.library = !this.library;
    this.toFilter(this.library);
  }

  openSchedule(schedule?, view?){
      const dialogConfig: MatDialogConfig = {
        width: '90%',
        maxWidth: '1200px',
        hasBackdrop: true,
        closeOnNavigation: false,
      };
  
      this._dialog
        .open(DialogScheduleComponent, {
          data: {instance_id: this.instance_id, schedule, view},
          ...dialogConfig,
        })
        .afterClosed()
        .subscribe((res) => {
          if(res){
            if (res.get('id')) {
              this.update(res.get('id'), res);
            }else{
              this.create(res);
            }
          }
        });
    }

    openAutomation(){
      const dialogConfig: MatDialogConfig = {
        width: '90%',
        maxWidth: '800px',
        hasBackdrop: true,
        closeOnNavigation: false,
      };
  
      this._dialog
        .open(DialogAutomationComponent, {
          data: {instance_id: this.instance_id},
          ...dialogConfig,
        });        
    }

    toFilter(library?) {
      if(library){
        this.filters = {status: 'Model'};
      }else{
        this.filters = {
          status: 'Waiting,Sent',
          ...this.form.getRawValue(),
          date: this.form.get('date').value ? dayjs(this.form.get('date').value).format('YYYY-MM-DD') : null
        };
      }
    }

    importSchedule(schedule){
      this.update(schedule.id, {
        ...schedule,
        status: 'Waiting'
      });
    }

    copySchedule(schedule){
      this.create({
        ...schedule,
        status: 'Waiting'
      });
    }

    create(data: FormData){
      this.loading = true;
      this._scheduleService.create(data)
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: (res) =>{
          this._toastrService.success(res.message)
        },
        error: (error) => {
          this._toastrService.error(error.error.message)
        }      
      })
    }

    update(id, data: FormData){
      this.loading = true;
      this._scheduleService.update(id, data)
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: (res) =>{
          this._toastrService.success(res.message)
        },
        error: (error) => {
          this._toastrService.error(error.error.message)
        }      
      })
    }

    delete(id){
      this.loading = true;
      this._scheduleService.delete(id)
      .pipe(finalize(()=> this.loading = false))
      .subscribe({
        next: (res) =>{
          this._toastrService.success(res.message)
        },
        error: (error) => {
          this._toastrService.error(error.error.message)
        }      
      })
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
}
