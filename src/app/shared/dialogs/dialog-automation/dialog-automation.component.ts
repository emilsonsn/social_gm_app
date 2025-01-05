import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AutomationService } from '@services/automation.service';
import { InstanceService } from '@services/instance.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dialog-automation',
  templateUrl: './dialog-automation.component.html',
  styleUrl: './dialog-automation.component.scss'
})
export class DialogAutomationComponent {
 public form: FormGroup;
  public loading: boolean = false;
  public title: string = 'Configuração de mensagens';

  groups: [{id: string, subject: string}];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data,
    private readonly dialogRef: MatDialogRef<DialogAutomationComponent>,
    private readonly _fb : FormBuilder,
    private readonly _automationService: AutomationService,
    private readonly _toastrService: ToastrService,
    private readonly _instanceService: InstanceService,
    
  ){}

  ngOnInit(): void {

    this.form = this._fb.group({
      id: [null],
      welcome_message: ['', Validators.required],
      farewell_message: ['', Validators.required],
      instance_id: [null],
      group_id: [null],

    });

    this.form.get('instance_id').patchValue(this._data.instance_id);
    this.getAutomation();
    this.getGroups();
  }

  getAutomation(){
    const filters = {instance_id: this._data.instance_id};
    
    this._automationService.search({}, filters)
    .subscribe({
      next: (res) => {
        if(res?.data[0]){
          this.form.patchValue({...res.data[0]});
        }
      },
      error: (error) => {

      }
    })
  }

  getGroups(){
    this.loading = true;
    this._instanceService.group(this.form.get('instance_id').value)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        this.groups = res.data;            
      },
      error: (err) => {
        console.error(err);
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

    if(this.form.get('id').value){
      this.update();
    }else{
      this.create();
    }
  }

  create(){
    this._automationService.create(this.form.getRawValue())
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
    this._automationService.update(this.form.get('id').value ,this.form.getRawValue())
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
