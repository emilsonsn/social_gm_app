import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstanceService } from '@services/instance.service';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.scss'
})
export class InstanceComponent {

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _instanceService: InstanceService
    
  ){}

  loading: boolean = false;
 
  ngOnInit(){
    this._instanceService.group('guimadureira')
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  public openInstance(){

  }

}
