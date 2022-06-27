import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Actividad } from 'src/app/models/Actividad';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities?: Actividad[];
  Actividad: Actividad = new Actividad();

  accion = 'Agregar';
  form: FormGroup;
  id?: number;

  constructor(
    private activityService: ActivityService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        describcion: ['', Validators.required]
    })
  }

  ngOnInit(): void { this.onDataTable();
  }

  onDataTable():void {
    this.activityService.getAllActivities().subscribe({
      next:(data) => { this.activities = data; },
      error: (e) => console.error(e),
    });
  }

  saverOrUpdateActivity() {
    const activity: Actividad = {
      titulo: this.form.get('titulo')?.value,
      describcion: this.form.get('describcion')?.value,
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

  
  editarActivity(Actividad: Actividad) {
    this.accion = 'Editar';
    this.id = Actividad.id;

    this.form.patchValue({
      titulo: Actividad.titulo,
      description: Actividad.describcion,
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
