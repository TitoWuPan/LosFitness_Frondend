import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Actividad } from '../models/Actividad';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<Actividad[]>{
    return this.http.get<Actividad[]>(`${this.baseUrl}/ActividadControler`);
  }

  addActivity(Actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(`${this.baseUrl}/ActividadControler`, Actividad);
  }

  updateActivity(id: number, data: any): Observable<Actividad> {
    return this.http.put(`${this.baseUrl}/ActividadControler/${id}`, data);
  }

  deleteActivity(id: number): Observable<Actividad> {
    return this.http.delete(`${this.baseUrl}/ActividadControler/${id}`);
  }
}
