import { Pipe, PipeTransform } from '@angular/core';
import { SchedulingStatus } from '@models/Scheduling';

@Pipe({
  name: 'schedule_status'
})
export class ScheduleStatusPipe implements PipeTransform {

  transform(value: SchedulingStatus): string {
    switch(value){
      case SchedulingStatus.Waiting:
        return 'Aguardando';
      case SchedulingStatus.Inactive:
        return 'Inativo';
      case SchedulingStatus.Model:
        return 'Modelo';
      case SchedulingStatus.Sent:
        return 'Enviado';
      case SchedulingStatus.Copy:
        return "Cópia"
    }
  }

}
