import {Component, computed, Signal, signal} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {DashboardService} from "@services/dashboard.service";
import {ApiResponse} from "@models/application";
import {OrderData} from "@models/dashboard";
import {formatCurrency} from "@angular/common";
import { InstanceService } from '@services/instance.service';
import { connect, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogInstanceComponent } from '@shared/dialogs/dialog-instance/dialog-instance.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public loading: boolean = false;

  dashboardCards = signal<OrderData>(
    {
      ordersByDay: 0,
      ordersByWeek: 0,
      ordersByMonth: 0,
      ordersByYear: 0,
      pendingOrders: 0,
      awaitingFinanceOrders: 0,
      solicitationPendings: 0,
      solicitationFinished: 0,
    }
  );

  constructor(
    private readonly _instanceService: InstanceService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog
  ) {
  }

  instances :any[] = [];

  getInstances(){
    this.loading = true;
    this._instanceService.search({})
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        if (res.data) {
          this.instances = res.data;
        }
      },
      error: (error) => console.error('Error:', error)
    })
  }

  createNewInstance(qrcode?){
    const dialogConfig: MatDialogConfig = {
      width: '80%',
      maxWidth: '400px',
      hasBackdrop: true,
      closeOnNavigation: true,
    };

    this._dialog
      .open(DialogInstanceComponent, {
        data: qrcode ?? null,
        ...dialogConfig,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.create(res);
        }else{
          this.getInstances();
        }
      });
  }

  create(instance){
    this.loading = false;
    this._instanceService.create(instance)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {        
      }
    })
  }


  ngOnInit() {
    this.getInstances();
  }

  onCardClick(instance){
    if(instance.connectionStatus === 'open'){
      this._router.navigate(['/painel/instance/' + instance.id]);
    }else{
      this.connectInstance(instance.name);
    }
  }

  connectInstance(instanceName){
    this.loading = true;
    this._instanceService.connect(instanceName)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.createNewInstance(res.data);
      },
      error: (error) => {
        // this.toa error.error.message
      }
    })
  }

}
