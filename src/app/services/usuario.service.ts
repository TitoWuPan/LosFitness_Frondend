import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllUsuario(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/UsuarioControler`);
  }

  addUsuario(Activity: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/UsuarioControler`, Usuario);
  }

  updateUsuario(id: number, data: any): Observable<Usuario> {
    return this.http.put(`${this.baseUrl}/UsuarioControler/Cambiar datos/${id}`, data);
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete(`${this.baseUrl}/UsuarioControler/Eliminar Cuenta/${id}`);
  }
}
