import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioControler } from 'src/app/models/UsuarioControler';
import { UsuarioControlerService } from 'src/app/services/usuario-controler.service';

@Component({
  selector: 'app-usuario-controler',
  templateUrl: './usuario-controler.component.html',
  styleUrls: ['./usuario-controler.component.css']
})
export class UsuarioControlerComponent implements OnInit {
  usuarioControlers?:UsuarioControler[];
  usuarioControler:UsuarioControler=new UsuarioControler();
  accion= 'Agregar';
  form: FormGroup;
  id?:number;
  constructor(
    private usuarioControlerService:UsuarioControlerService,
    private fb:FormBuilder,
    private toastr:ToastrService){
      this.form=this.fb.group({
        nombre:['',Validators.required]
      });

    }
  ngOnInit(): void {
    this.onDatatable();

  }


  onDatatable():void{
    this.usuarioControlerService.getAllUsuarioControler().subscribe({
      next:(data)=>{
        this.usuarioControlers=data;

      },
      error:(e)=>console.error(e),
    })
  }
  saveOrUpdateUsuarioControler() {
    const usuarioControler: UsuarioControler = {
      nombre: this.form.get('nombre')?.value,
    };

    if (this.id == undefined) {
      this.usuarioControlerService.addUsuarioControler(usuarioControler).subscribe({
        next: (data) => {
          this.toastr.success(
            'El Nombre fue registrado con exito',
            'Usuario registrado'
          );
          this.onDatatable();
          this.form.reset();
        },
        error: (e) => {
          this.toastr.error('Ocurrio un error', 'Error');
        },
      });
    } else {
      usuarioControler.id = this.id;
      this.usuarioControlerService.updateUsuarioControler(this.id, usuarioControler).subscribe({
        next: (data) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info('El nombre fue actualizado', 'Nombre actualizado');
          this.onDatatable();
        },
        error: (e) => {
          this.toastr.error('Ocurrio un error', 'Error');
        },
      });
    }
  }
  editUsuarioControler(usuarioControler: UsuarioControler) {
    this.accion = 'Editar';
    this.id = usuarioControler.id;
    this.form.patchValue({
      description: usuarioControler.nombre,
    });
  }
  deleteUsuarioControler(id: number) {
    this.usuarioControlerService.deleteUsuarioControler(id).subscribe({
      next: (data) => {
        this.toastr.error(
          'La tarjeta fue eliminada con exito!',
          'Tarjeta eliminada'
        );
        this.onDatatable();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  


}
