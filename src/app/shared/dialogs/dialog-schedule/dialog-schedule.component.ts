import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Link } from '@models/link';
import { UserRole } from '@models/user';
import { InstanceService } from '@services/instance.service';
import { LinkService } from '@services/link.service';
import { SessionService } from '@store/session.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dialog-schedule',
  templateUrl: './dialog-schedule.component.html',
  styleUrl: './dialog-schedule.component.scss'
})
export class DialogScheduleComponent {

  public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Cria Agendamento';  
  groups: [{id: string, subject: string}];
  links: Link[];
  role: UserRole|string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogScheduleComponent>,
    private readonly _fb : FormBuilder,
    private route: ActivatedRoute,
    private readonly _instanceService: InstanceService,
    private readonly _linkService: LinkService,
    private readonly _sessionService: SessionService
  ){}

  ngOnInit(): void {

    if(this._data.schedule){
      this.title = 'Editar Agendamento';
    }
  
    this.form = this._fb.group({
      id: [null],
      description: ['', Validators.required],
      instance_id: [this._data.instance_id, [Validators.required]],
      group_id: [null, [Validators.required]],
      link_id: [null],
      status: [null],
      group_name: [null, [Validators.required]],
      text: [null, [Validators.required]],
      midia: [null, [Validators.required]],
      mention: [null, [Validators.required]],
      video_path: [null],
      image_path: [null],
      audio_path: [null],
      datetime: [null, [Validators.required]],
      user_id: [null],
    });

    this.form.get('midia').valueChanges
    .subscribe(value => {
        this.form.get('imagem_path').patchValue(null);
        this.form.get('video_path').patchValue(null);
        this.form.get('audio_path').patchValue(null);
    });

    this.loadPosition();
    this.getGroups();
    this.getLinks();
  }

  loadPosition(){
    this._sessionService.getUser()
    .subscribe(user => {
      this.role = user.role;
    });
  }

  getGroups(){
    this.loading = true;
    this._instanceService.group(this.form.get('instance_id').value)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        this.groups = res.data;
        this.form.patchValue({
          ...this._data.schedule,
          audio_path: null,
          image_path: null,
          video_path: null,
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getLinks(){
    this.loading = true;
    this._linkService.getLinks()
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        this.links = res.data;       
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }
  
  public onConfirm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValues = this.form.getRawValue();

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key];
      if (key === 'video_path' || key === 'audio_path' || key === 'image_path') {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, value ?? '');
      }
    });

    this.dialogRef.close(formData);
  }

  setGroupName(groupName){
    this.form.get('group_name').patchValue(groupName);
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.form.get(controlName)?.setValue(file);
    }
  }

  public get formattedText(): string {
    const text = this.form.get('text')?.value || '';
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  }
}
