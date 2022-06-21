import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Activity } from 'src/app/models/Activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities?: Activity[];
  activity: Activity = new Activity();

  accion = 'Agregar';
  form: FormGroup;
  id?: number;

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onDataTable():void {
    this.activityService.getAllActivities().subscribe({
      next:(data) => { this.activities = data; },
      error: (e) => console.error(e),
    });
  }

  saverOrUpdateActivity() {
    const activity: Activity = {
      titulo: this.form.get('titulo')?.value,
      description: this.form.get('description')?.value,
    };

    if (this.id == undefined) {
      this.activityService.addActivity(activity).subscribe({
        next: (data) => {
          this.toastr.success(
            'La tarjeta fue registrada con exito!',
            'Tarjeta Registrada'
          );
          this.onDataTable();
          this.form.reset();
        },
        error: (e) => { this.toastr.error('Opss.. ocurrio un error', 'Error'); console.log(e); },
      });
    } else {
      activity.id = this.id;
      this.activityService.updateActivity(this.id, activity).subscribe({
        next: (data) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info(
            'La tarjeta fue actualizada con exito!',
            'Tarjeta Actualizada'
          );
          this.onDataTable();
        },
        error: (e) => { console.log(e); },
      });
    }
  }

  
  editarActivity(activity: Activity) {
    this.accion = 'Editar';
    this.id = activity.id;

    this.form.patchValue({
      titulo: activity.titulo,
      description: activity.description,
    });
  }


  eliminarActivity(id: number) {
    this.activityService.deleteActivity(id).subscribe({
      next: (data) => {
        this.toastr.error(
          'La tarjeta fue eliminada con exito!',
          'Tarjeta eliminada'
        );
        this.onDataTable();
      },
      error: (e) => { console.log(e); },
    });
  }

}
