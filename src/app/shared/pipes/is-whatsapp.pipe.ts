import { Pipe, PipeTransform } from '@angular/core';
import { PaymentForm } from '@models/application';

@Pipe({
  name: 'is_whatsapp'
})
export class IsWhatsappPipe implements PipeTransform {

  transform(value: string) {
    switch (value) {
      case 'Pending':
        return 'Pendente';
      case 'Whatstapp':
        return 'É whatsapp';
      case 'NotFound':
        return 'Não encontrado';

      default:
        return value;
    }
  }

}
