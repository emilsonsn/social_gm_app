import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs';
import {User} from '@models/user';
import {UserService} from '@services/user.service';
import { DialogUserComponent } from '@shared/dialogs/dialog-user/dialog-user.component';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.scss',
})
export class CollaboratorComponent {
  public loading: boolean = false;


  constructor(
    private readonly _dialog: MatDialog,
    private readonly _toastr: ToastrService,
    private readonly _router: Router,
    private readonly _userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  private _initOrStopLoading(): void {
    this.loading = !this.loading;
  }

  openDialogCollaborator(user?, view: boolean = false): void {
        const dialogConfig: MatDialogConfig = {
          width: '90%',
          maxWidth: '800px',
          hasBackdrop: true,
          closeOnNavigation: false,
        };
        
        this._dialog
          .open(DialogUserComponent, {
            data: {user, view},
            ...dialogConfig,
          })
          .afterClosed()
          .subscribe((res: User) => {
            this._initOrStopLoading();
            setTimeout( () => {
              this._initOrStopLoading();
            }, 500)
          });
    }

  _patchCollaborator(collaborator: User) {
    this._initOrStopLoading();
    const id = +collaborator.id;
    this._userService
      .patchUser(id, collaborator)
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe({
        next: (res) => {
          if (res.status) {
            this._toastr.success(res.message);
          }
        },
        error: (err) => {
          this._toastr.error(err.error.error);
        },
      });
  }

  _postCollaborator(collaborator: User) {
    this._initOrStopLoading();

    this._userService
      .postUser(collaborator)
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe({
        next: (res) => {
          if (res.status) {
            this._toastr.success(res.message);
          }
        },
        error: (err) => {
          this._toastr.error(err.error.error);
        },
      });
  }

  onDeleteCollaborator(id: number) {
    this._deleteCollaborator(id);
  }

  _deleteCollaborator(id: number) {
    this._initOrStopLoading();
    this._userService
      .deleteUser(id)
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe({
        next: (res) => {
          this._toastr.success(res.message);
        },
        error: (err) => {
          this._toastr.error(err.error.error);
        },
      });
  }
}
