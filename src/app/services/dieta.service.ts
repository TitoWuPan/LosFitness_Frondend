import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Dieta } from '../models/Dieta';

@Injectable({
  providedIn: 'root'
})
export class DietaService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllDietas(): Observable<Dieta[]>{
    return this.http.get<Dieta[]>(`${this.baseUrl}/DietaControler`);
  }

  addDieta(Dieta: Dieta): Observable<Dieta> {
    return this.http.post<Dieta>(`${this.baseUrl}/DietaControler`, Dieta);
  }

  updateDieta(id: number, data: any): Observable<Dieta> {
    return this.http.put(`${this.baseUrl}/DietaControler/${id}`, data);
  }

  deleteDieta(id: number): Observable<Dieta> {
    return this.http.delete(`${this.baseUrl}/DietaControler/${id}`);
  }
}
