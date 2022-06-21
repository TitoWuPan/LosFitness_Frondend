import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Usuario_Recompensa } from 'src/app/models/Usuario_Recompensa';
import { UsuarioRecompensaService } from 'src/app/services/usuario-recompensa.service';

@Component({
  selector: 'app-usuario-recompensa',
  templateUrl: './usuario-recompensa.component.html',
  styleUrls: ['./usuario-recompensa.component.css']
})
export class UsuarioRecompensaComponent implements OnInit {
  usuario_Recompensas?: Usuario_Recompensa[];
  usuario_Recompensa: Usuario_Recompensa = new Usuario_Recompensa();

  accion = 'Agregar';
  form: FormGroup;
  id?: number;

  constructor(
    private usuarioRecompensaService: UsuarioRecompensaService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        idUsuario: ['', Validators.required],
        idRecompensa: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onDataTable():void {
    this.usuarioRecompensaService.getAllRecompensa().subscribe({
      next:(data) => { this.usuario_Recompensas = data; },
      error: (e) => console.error(e),
    });
  }

  saverOrUpdateUsuario_Recompensa() {
    const usuario: Usuario_Recompensa = {
      idUsuario: this.form.get('idUsuario')?.value,
      idRecompensa: this.form.get('idRecompensa')?.value,
    
    };

    if (this.id == undefined) {
      this.usuarioRecompensaService.addRecompensa(usuario).subscribe({
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
    } 
  }

}
