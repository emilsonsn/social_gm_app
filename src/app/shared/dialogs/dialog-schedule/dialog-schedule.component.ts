import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Link } from '@models/link';
import { UserRole } from '@models/user';
import { InstanceService } from '@services/instance.service';
import { LinkService } from '@services/link.service';
import { SessionService } from '@store/session.service';
import dayjs from 'dayjs';
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
  public isLibrary: boolean = false;
  public isImport: boolean = false;
  
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

    const today = dayjs().format('YYYY-MM-DDTHH:mm');

    this.form = this._fb.group({
      id: [null],
      description: ['', Validators.required],
      instance_id: [this._data.instance_id, [Validators.required]],
      group_id: [null, [Validators.required]],
      link_id: [null],
      group_name: [null, [Validators.required]],
      text: [null, [Validators.required]],
      midia: [null, [Validators.required]],
      mention: [0, [Validators.required]],
      status: [null],
      video_path: [null],
      image_path: [null],
      audio_path: [null],
      datetime: [today, [Validators.required]],
      user_id: [null],
    });
    
    this.isImport = !!this._data.library && !!this._data.schedule.id && !this._data?.schedule?.edit;

    if(this._data.library){
      this.title = 'Modelo';
      this.form.get('status').patchValue('Waiting');
      if(!this._data.schedule.id || this._data?.schedule?.edit){
        this.isLibrary = true;
        this.removeValidators();
        this.form.get('status').patchValue('Model');
      }
    }

    this.form.get('midia').valueChanges
    .subscribe(value => {
        this.form.get('imagem_path').patchValue(null);
        this.form.get('video_path').patchValue(null);
        this.form.get('audio_path').patchValue(null);
    });

    this.loadPosition();
    if(!this.isLibrary) this.getGroups();
    if(!this.isLibrary) this.getLinks();
    if(this._data?.schedule?.edit) this.fillForm(this._data?.schedule);
  }

  loadPosition(){
    this._sessionService.getUser()
    .subscribe(user => {
      this.role = user.role;
    });
  }

  removeValidators(){
    const controlsName = [
      'group_name',
      'group_id',
      'datetime',
      'mention',
      'group_id'
    ];

    controlsName.forEach(( controlName ) => {
      this.form.get(controlName).clearValidators();
      this.form.get(controlName).updateValueAndValidity();
    });    
  }

  getGroups(){
    this.loading = true;
    this._instanceService.group(this.form.get('instance_id').value)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        this.groups = res.data;
        this.fillForm({
          ...this._data.schedule,
          id: this._data.library && !this._data.schedule?.edit ? '' : this._data.schedule.id,
          group_id: this._data.schedule?.group_id?.split(','),
          status: this.isImport ? 'Waiting' : this._data.schedule.status
        })        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getLinks(){
    this._linkService.getLinks({}, {
      instance_id : this.form.get('instance_id').value
    })
    .subscribe({
      next: (res) => {
        this.links = res.data;       
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  fillForm(schedule){
    this.form.patchValue(schedule);
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
        formData.append(key, value ?? '');
    });

    this.dialogRef.close(formData);
  }

  setGroupName(groupName: string): void {
    groupName = groupName.trim();
    const group_name_value = this.form.get('group_name').value
    let grupos =  group_name_value ? group_name_value.split(',').map((g: string) => g.trim()) : [];
    if (grupos.includes(groupName)) {
      const novosGrupos = grupos.filter((g: string) => g !== groupName);
      this.form.get('group_name').patchValue(novosGrupos.join(','));
    } else {
      grupos.push(groupName);
      grupos = grupos.filter((g: string) => !!groupName);
      this.form.get('group_name').patchValue(grupos.join(','));
    }
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
