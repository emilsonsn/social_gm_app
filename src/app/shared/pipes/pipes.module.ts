import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormPipe } from './payment-form.pipe';
import { StatusPipe } from './status.pipe';
import { PhoneMaskPipe } from './phone-mask.pipe';
import { CpfCnpjMaskPipe } from './cpf-cnpj-mask.pipe';
import { CompanyPositionPipe } from './company-position.pipe';
import { ScheduleStatusPipe } from './schedule-status.pipe';
import { IsWhatsappPipe } from './is-whatsapp.pipe';

const pipes = [
  PaymentFormPipe,
  StatusPipe,
  PhoneMaskPipe,
  CpfCnpjMaskPipe,
  CompanyPositionPipe,
  ScheduleStatusPipe,
  IsWhatsappPipe
];

@NgModule({
  declarations: [
    pipes,
    CompanyPositionPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    pipes
  ]
})
export class PipesModule { }
