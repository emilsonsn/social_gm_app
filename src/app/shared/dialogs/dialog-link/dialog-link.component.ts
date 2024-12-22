import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { SessionService } from '@store/session.service';

@Component({
  selector: 'app-dialog-link',
  templateUrl: './dialog-link.component.html',
  styleUrl: './dialog-link.component.scss'
})
export class DialogLinkComponent {

  public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Cria Link';
  public isAdmin: boolean = false;
  public users: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogLinkComponent>,
    private readonly _fb : FormBuilder,
    private readonly _sessionService: SessionService,
    private readonly _userService: UserService
  ){}

  ngOnInit(): void {

    this.form = this._fb.group({
      id: [null],
      name: ['', Validators.required],
      url: ['', Validators.required],
      user_id: [null]
    });

    this.getUsers();
    this.loadPosition();

    if(this._data.link){
      this.title = 'Editar Link';      
      this.form.patchValue(this._data.link);
    }
  }

  loadPosition(){
    this._sessionService.getUser()
    .subscribe(user => {
      this.isAdmin = user.role === 'Admin'
    })
  }

  getUsers(){
    this._userService.getUsers({})
    .subscribe({
      next: (res) => {
        this.users = res.data;
      }
    })
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
   
  public onConfirm(){

    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }
}
