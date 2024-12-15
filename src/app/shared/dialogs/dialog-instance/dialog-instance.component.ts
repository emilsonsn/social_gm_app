import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-instance',
  templateUrl: './dialog-instance.component.html',
  styleUrl: './dialog-instance.component.scss'
})
export class DialogInstanceComponent {

  public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Cria Instância';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogInstanceComponent>,
    private readonly _fb : FormBuilder,
  ){}

  ngOnInit(): void {

    if(this._data) this.title = 'Conectar Instância';

    this.form = this._fb.group({
      name: ['', Validators.required],
    });
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
