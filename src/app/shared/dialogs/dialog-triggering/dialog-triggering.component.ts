import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactListService } from '@services/contact_list.service';

@Component({
  selector: 'app-dialog-triggering',
  templateUrl: './dialog-triggering.component.html',
  styleUrls: ['./dialog-triggering.component.scss']
})
export class DialogTriggeringComponent {
  public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Criar disparo';
  public contactLists: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogTriggeringComponent>,
    private readonly _fb: FormBuilder,
    private readonly _contactListService: ContactListService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      id: [''],
      description: ['', Validators.required],
      contact_list_id: ['', Validators.required],
      evo_url: ['', Validators.required],
      evo_key: ['', Validators.required],
      evo_instance: ['', Validators.required],
      interval: ['', [Validators.required]],
      file: [''],
      messages: this._fb.array([], Validators.required),
    });

    if (this._data.triggering) {
      this.title = 'Editar disparo';
      this.form.patchValue(this._data.triggering);
      this._data.triggering.messages.forEach((message) => {
        this.messages.push(new FormControl(message.message, Validators.required));
      });
    }

    this.getContactList();
  }

  // Getter para mensagens como FormArray
  get messages(): FormArray {
    return this.form.get('messages') as FormArray;
  }

  getContactList(): void {
    this._contactListService.search().subscribe({
      next: (res) => {
        this.contactLists = res.data;
      },
    });
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const validFileTypes = ['image/', 'video/'];

      if (!validFileTypes.some((type) => file.type.startsWith(type))) {
        this.form.get('file').setErrors({ invalidFileType: true });
        return;
      }

      this.form.patchValue({ file });
      this.form.get('file').updateValueAndValidity();
    }
  }

  public addMessage(): void {
    this.messages.push(new FormControl('', Validators.required));
  }

  public removeMessage(index: number): void {
    this.messages.removeAt(index); // Remove FormControl pelo índice
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      console.log(this.form.controls);
      return;
    }

    const formData = new FormData();
    formData.append('id', this.form.get('id').value);
    formData.append('description', this.form.get('description').value);
    formData.append('contact_list_id', this.form.get('contact_list_id').value);
    formData.append('evo_url', this.form.get('evo_url').value);
    formData.append('evo_key', this.form.get('evo_key').value);
    formData.append('evo_instance', this.form.get('evo_instance').value);
    formData.append('interval', this.form.get('interval').value);

    const file = this.form.get('file').value;
    if (file) {
      formData.append('file', file);
    }

    this.messages.controls.forEach((control, index) => {
      formData.append(`messages[${index}]`, control.value);
    });

    this.dialogRef.close(formData);
  }

  private validateFileType(control: FormControl): { [key: string]: boolean } | null {
    const file = control.value;
    if (!file) return null;

    const validFileTypes = ['image/', 'video/'];
    return validFileTypes.some((type) => file.type.startsWith(type))
      ? null
      : { invalidFileType: true };
  }
}
