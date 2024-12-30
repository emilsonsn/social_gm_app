import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactListService } from '@services/contact_list.service';
import { TriggeringService } from '@services/triggering.service';
import { DialogContactListComponent } from '@shared/dialogs/dialog-contact-list/dialog-contact-list.component';
import { DialogTriggeringComponent } from '@shared/dialogs/dialog-triggering/dialog-triggering.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-triggering',
  templateUrl: './triggering.component.html',
  styleUrl: './triggering.component.scss'
})
export class TriggeringComponent {

  loading: boolean = false;
  
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _contactListService: ContactListService,
    private readonly _toastrService: ToastrService,
    private readonly _triggeringService: TriggeringService
  ){}

  openContactList(triggering?, isView?: boolean){
    const dialogConfig: MatDialogConfig = {
        width: '90%',
        maxWidth: '800px',
        hasBackdrop: true,
        closeOnNavigation: false,
      };
    
      const data = {
        triggering,
        view: isView
      }
  
      this._dialog
        .open(DialogTriggeringComponent, {
          data,
          ...dialogConfig,
        })
        .afterClosed()
        .subscribe((triggering) => {
          if(triggering){
            if(triggering.get('id')){
              this.uprateTriggering(triggering.get('id'), triggering);
            }else{
              this.createTriggering(triggering);
            }
          }
        });
  }

  createTriggering(triggering){
    this.loading = true;
    this._triggeringService
    .create(triggering)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next:(res) => {
        this._toastrService.success(res.message);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  uprateTriggering(id, triggering){
    this.loading = true;
    this._triggeringService
    .update(id, triggering)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next:(res) => {
        this._toastrService.success(res.message);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  deleteContact(id: number){
    this.loading = true;
    this._triggeringService
    .delete(id)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        this._toastrService.success(res.message);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }
}
