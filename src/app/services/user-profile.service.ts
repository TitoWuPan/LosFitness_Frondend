import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsuario(id : number) : Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/UsuarioControler/${id}`);
  }

  updateUsuario(id: number, data: any): Observable<Usuario> {
    return this.http.put(`${this.baseUrl}/UsuarioControler/${id}`, data);
  }

  deleteUsuario(id: number): Observable<Usuario> {
    return this.http.delete(`${this.baseUrl}/UsuarioControler/${id}`);
  }
}
