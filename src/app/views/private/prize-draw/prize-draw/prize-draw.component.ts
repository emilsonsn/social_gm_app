import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Instance } from '@models/Instance';
import { InstanceService } from '@services/instance.service';
import { PrizeDrawService } from '@services/prizeDraw.service';
import { DialogDrawnsComponent } from '@shared/dialogs/dialog-drawns/dialog-drawns.component';
import { DialogPrizeDrawComponent } from '@shared/dialogs/dialog-prize-draw/dialog-prize-draw.component';
import { ToastrService } from 'ngx-toastr';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-prize-draw',
  templateUrl: './prize-draw.component.html',
  styleUrl: './prize-draw.component.scss'
})
export class PrizeDrawComponent {

  form: FormGroup;
  loading: boolean = false;

  groups: any[];
  instances: Instance[] = [];

  constructor(
    private readonly _fb: FormBuilder, 
    private readonly _instanceService: InstanceService,
    private readonly _prizeDrawService: PrizeDrawService,
    private readonly _dialog: MatDialog,
    private readonly _toastrService: ToastrService
  ){}

  ngOnInit(){
    this.form = this._fb.group({
      instance_id: ['', [Validators.required]],
      groups: ['', [Validators.required]],
      groups_name: ['', [Validators.required]],
      prize_name: ['', [Validators.required]]
    });

    this.getInstance();

    this.form.get('instance_id').valueChanges
    .subscribe(instance_id => {
      console.log(instance_id);
      this.getGroups(instance_id);
    });
  }

  getInstance(){
    this._instanceService.search({})
    .subscribe({
      next: res => {
        this.instances = res.data;        
      },
      error: error => {
        console.error(error.error.message);
      }
    })
  }

  getGroups(instance_id){
      this.loading = true;
      this._instanceService.group(instance_id)
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

  setGroupName(groupName: string): void {
    groupName = groupName.trim();
    const group_name_value = this.form.get('groups_name').value
    let grupos =  group_name_value ? group_name_value.split(',').map((g: string) => g.trim()) : [];
    if (grupos.includes(groupName)) {
      const novosGrupos = grupos.filter((g: string) => g !== groupName);
      this.form.get('groups_name').patchValue(novosGrupos.join(','));
    } else {
      grupos.push(groupName);
      grupos = grupos.filter((g: string) => !!groupName);
      this.form.get('groups_name').patchValue(grupos.join(','));
    }
  }

  onConfirm(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      console.log(this.form.controls);
      return;
    }
    this.loading = true;
    this._prizeDrawService.create({
      ...this.form.getRawValue(),
      groups: this.form.get('groups').value.join(','),
    })
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (res) => {
        console.log(res.data);
        this.openPrizeDrawDialog(res.data)
      },
      error: (error) => {
        console.error(error.error.message);
      }
    });
  }

  openPrizeDrawDialog(data?){
     const dialogConfig: MatDialogConfig = {
       width: '90%',
       maxWidth: '1000px',
       minHeight: "600px",
       hasBackdrop: true,
       closeOnNavigation: false,
     };
      
     this._dialog
       .open(DialogPrizeDrawComponent, {
         data: data,
         ...dialogConfig,
       })
       .afterClosed()
       .subscribe(() => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 1500);
       });
  }

  onDelete(id){
    this.loading = true;
    this._prizeDrawService.delete(id)
    .pipe(finalize(()=> this.loading = false))
    .subscribe({
      next: () => {
        this._toastrService.success('Sorteio deletado com sucesso');
      },
      error: (error) => {
        this._toastrService.success(error.error.message);
      }
    })
  }

  onView(draws){
    const dialogConfig: MatDialogConfig = {
      width: '90%',
      maxWidth: '600px',      
      hasBackdrop: true,
      closeOnNavigation: false,
    };
     
    this._dialog
      .open(DialogDrawnsComponent, {
        data: draws,
        ...dialogConfig,
      });  
    
  }

}
