import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LinkService } from '@services/link.service';
import { DialogLinkComponent } from '@shared/dialogs/dialog-link/dialog-link.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _linkService: LinkService,
    private readonly _toastrService: ToastrService
  ){}

  loading: boolean = false;


  openLink(data?, view?){
        const dialogConfig: MatDialogConfig = {
          width: '90%',
          maxWidth: '600px',
          hasBackdrop: true,
          closeOnNavigation: false,
        };
    
        this._dialog
          .open(DialogLinkComponent, {
            data: {link: data, view},
            ...dialogConfig,
          })
          .afterClosed()
          .subscribe((res) => {
            if(res){
              if (res.id) {
                this.update(res);
              }else{
                this.create(res);
              }
            }
          });
      }

    create(link){
      this.loading = true;
      this._linkService.postLink(link)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
          next: (res) => {
            this._toastrService.success(res.message);
          },
          error: (error) => {        
            this._toastrService.error(error.error.message);
          }
  
      });
    }

    update(link){
      this.loading = true;
      this._linkService.patchLink(link.id, link)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
          next: (res) => {
            this._toastrService.success(res.message);
          },
          error: (error) => {
            this._toastrService.error(error.error.message);
          }

      });
    }

    delete(id){
      this.loading = true;
      this._linkService.deleteLink(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
          next: (res) => {
            this._toastrService.success(res.message);
          },
          error: (error) => {
            this._toastrService.error(error.error.message);
          }

      });
    }

}
