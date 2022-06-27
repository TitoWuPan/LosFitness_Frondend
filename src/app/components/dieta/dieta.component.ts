import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Dieta } from 'src/app/models/Dieta';
import { DietaService } from 'src/app/services/dieta.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent implements OnInit {
  
  Dietas?: Dieta[];
  Dieta: Dieta = new Dieta();

  accion = 'Agregar';
  form: FormGroup;
  id?: number;

  constructor(
    private dietaService: DietaService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        titulo: ['', Validators.required],
        describcion: ['', Validators.required],
        puntuacion: ['', Validators.required]
    })
  }

  ngOnInit(): void { this.onDataTable();
  }

  onDataTable():void {
    this.dietaService.getAllDietas().subscribe({
      next:(data) => { this.Dietas = data; },
      error: (e) => console.error(e),
    });
  }

  saverOrUpdateDieta() {
    const Dieta: Dieta = {
      titulo: this.form.get('Titulo')?.value,
      describcion: this.form.get('Describcion')?.value,
      puntuacion: this.form.get('Puntuacion')?.value,
    };

    if (this.id == undefined) {
      this.dietaService.addDieta(Dieta).subscribe({
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
      Dieta.id = this.id;
      this.dietaService.updateDieta(this.id, Dieta).subscribe({
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

  editarDieta(Dieta: Dieta) {
    this.accion = 'Editar';
    this.id = Dieta.id;

    this.form.patchValue({
      titulo: Dieta.titulo,
      describcion: Dieta.describcion,
      puntuacion: Dieta.puntuacion,
    });
  }

  eliminarDieta(id: number) {
    this.dietaService.deleteDieta(id).subscribe({
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

