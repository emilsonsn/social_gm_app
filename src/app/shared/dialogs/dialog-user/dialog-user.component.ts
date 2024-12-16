import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AutomationService } from '@services/automation.service';
import { UserService } from '@services/user.service';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss'
})
export class DialogUserComponent {
 public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Criar Usuário';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogUserComponent>,
    private readonly _fb : FormBuilder,
    private readonly _userService: UserService,
    private readonly _toastrService: ToastrService,
  ){}

  ngOnInit(): void {

    this.form = this._fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf_cnpj: ['', Validators.required],
      phone: ['', Validators.required],
      birth_date: ['', Validators.required],
      is_active: [1, Validators.required]
    });
    

    if(this._data?.user?.id){
      this.title = 'Editar Usuário';
      this.form.patchValue(this._data.user);
    }
  }


  public onCancel(): void {
    this.dialogRef.close(false);
  }
   
  public onConfirm(){

    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    if(this.form.get('id').value){
      this.update();
    }else{
      this.create();
    }
  }

  create(){
    this._userService.postUser({
      ...this.form.getRawValue(),
      birth_date: this.form.get('birth_date').value ? dayjs(this.form.get('birth_date').value).format('YYYY-MM-DD') : null
    })
    .subscribe({
      next: (res) => {
        this._toastrService.success(res.message);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }

  update(){
    this._userService.patchUser(this.form.get('id').value ,this.form.getRawValue())
    .subscribe({
      next: (res) => {
        this._toastrService.success(res.message);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    })
  }
}
