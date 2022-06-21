import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios?: Usuario[];
  usuario: Usuario = new Usuario();

  accion = 'Agregar';
  form: FormGroup;
  id?: number;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService) { 
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        peso: ['', Validators.required],
        imageURL: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onDataTable():void {
    this.usuarioService.getAllUsuario().subscribe({
      next:(data) => { this.usuarios = data; },
      error: (e) => console.error(e),
    });
  }

  saverOrUpdateUsuario() {
    const usuario: Usuario = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      peso: this.form.get('peso')?.value,
      imageURL: this.form.get('imageURL')?.value
    };

    if (this.id == undefined) {

      this.usuarioService.addUsuario(usuario).subscribe({
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
      usuario.id = this.id;
      this.usuarioService.updateUsuario(this.id, usuario).subscribe({
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

  
  editarUsuario(usuario: Usuario) {
    this.accion = 'Editar';
    this.id = usuario.id;

    this.form.patchValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      peso: usuario.peso,
      imageURL: usuario.imageURL,
    });
  }

  eliminarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe({
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
