import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Usuario_Recompensa } from '../models/Usuario_Recompensa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRecompensaService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllRecompensa(): Observable<Usuario_Recompensa[]>{
    return this.http.get<Usuario_Recompensa[]>(`${this.baseUrl}/Usuario_RecompensaControler`);
  }

  addRecompensa(Usuario_Recompensa: Usuario_Recompensa): Observable<Usuario_Recompensa> {
    return this.http.post<Usuario_Recompensa>(`${this.baseUrl}/Usuario_RecompensaControler`, Usuario_Recompensa);
  }
}
