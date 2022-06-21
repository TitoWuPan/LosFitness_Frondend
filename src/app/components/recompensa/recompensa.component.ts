import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Recompensa } from 'src/app/models/Recompensa';
import { RecompensaService } from 'src/app/services/recompensa.service';

@Component({
  selector: 'app-recompensa',
  templateUrl: './recompensa.component.html',
  styleUrls: ['./recompensa.component.css']
})
export class RecompensaComponent implements OnInit {
  recompensas?: Recompensa[];
  recompensa: Recompensa = new Recompensa();

  accion = 'Agregar';
  form: FormGroup;
  id?: number;

  constructor(
    private recompensaService: RecompensaService,
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
    this.recompensaService.getAllRecompensa().subscribe({
      next:(data) => { this.recompensas = data; },
      error: (e) => console.error(e),
    });
  }

  saverOrUpdateRecompensa() {
    const activity: Recompensa = {
      titulo: this.form.get('titulo')?.value,
      description: this.form.get('description')?.value,
    };

    if (this.id == undefined) {
      this.recompensaService.addRecompensa(activity).subscribe({
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
      this.recompensaService.updateRecompensa(this.id, activity).subscribe({
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

  
  editarActivity(recompensa: Recompensa) {
    this.accion = 'Editar';
    this.id = recompensa.id;

    this.form.patchValue({
      titulo: recompensa.titulo,
      description: recompensa.description,
    });
  }
}
