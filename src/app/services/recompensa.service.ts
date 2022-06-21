import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Recompensa } from '../models/Recompensa';

@Injectable({
  providedIn: 'root'
})
export class RecompensaService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllRecompensa(): Observable<Recompensa[]>{
    return this.http.get<Recompensa[]>(`${this.baseUrl}/ActividadRecompensa`);
  }

  updateRecompensa(id: number, data: any): Observable<Recompensa> {
    return this.http.put(`${this.baseUrl}/ActividadRecompensa/${id}`, data);
  }

  addRecompensa(Activity: Recompensa): Observable<Recompensa> {
    return this.http.post<Recompensa>(`${this.baseUrl}/ActividadRecompensa/Recompensa`, Activity);
  }

}
