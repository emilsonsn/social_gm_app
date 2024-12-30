import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactListService } from '@services/contact_list.service';
import { DialogContactListComponent } from '@shared/dialogs/dialog-contact-list/dialog-contact-list.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  loading: boolean = false;
  
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _contactListService: ContactListService,
    private readonly _toastrService: ToastrService
  ){}

  openContactList(contact?, isView?: boolean){
    const dialogConfig: MatDialogConfig = {
        width: '90%',
        maxWidth: '800px',
        hasBackdrop: true,
        closeOnNavigation: false,
      };
    
      const data = {
        contact: contact,
        view: isView
      }
  
      this._dialog
        .open(DialogContactListComponent, {
          data,
          ...dialogConfig,
        })
        .afterClosed()
        .subscribe((res) => {
          if(res){
            this.import(res);
          }
        });
  }

  import(contacts){
    this.loading = true;
    this._contactListService
      .import(contacts)
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

  deleteContact(id: number){
    this.loading = true;
    this._contactListService
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
