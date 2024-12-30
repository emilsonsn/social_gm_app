import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-contact-list',
  templateUrl: './dialog-contact-list.component.html',
  styleUrl: './dialog-contact-list.component.scss'
})
export class DialogContactListComponent {

  public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Importar contatos';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogContactListComponent>,
    private readonly _fb : FormBuilder,
  ){}

  ngOnInit(): void {

    this.form = this._fb.group({
      description: ['', Validators.required],
      file: ['', Validators.required],
    });

    if(this._data.contact) {
      this.title = 'Lista de contatos';
      this.form.get('description').patchValue(this._data.contact.description);
    }

  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ file });
      this.form.get('file').updateValueAndValidity();
    }
  }
  
  public onCancel(): void {
    this.dialogRef.close(false);
  }
   
  public onConfirm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      console.log(this.form.controls);
      return;
    }
  
    const formData = new FormData();
  
    formData.append('description', this.form.get('description').value);
  
    const file = this.form.get('file').value;
    if (file) {
      formData.append('file', file);
    } else {
      console.error('Nenhum arquivo foi selecionado.');
      return;
    }
  
    console.log('Dados do FormData:', formData);
  
    this.dialogRef.close(formData);
  }
  
}
