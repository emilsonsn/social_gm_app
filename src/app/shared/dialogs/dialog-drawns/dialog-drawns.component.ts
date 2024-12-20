import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrizeDrawDrawn } from '@models/PrizeDraw';

@Component({
  selector: 'app-dialog-drawns',
  templateUrl: './dialog-drawns.component.html',
  styleUrl: './dialog-drawns.component.scss'
})
export class DialogDrawnsComponent {

  drawns: PrizeDrawDrawn[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data: any,
  ) {
    
  }

  ngOnInit(){
    this.drawns = this._data;
  }
}
