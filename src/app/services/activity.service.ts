import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Activity } from '../models/Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.baseUrl}/ActividadControler`);
  }

  addActivity(Activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.baseUrl}/ActividadControler`, Activity);
  }

  updateActivity(id: number, data: any): Observable<Activity> {
    return this.http.put(`${this.baseUrl}/ActividadControler/${id}`, data);
  }

  deleteActivity(id: number): Observable<Activity> {
    return this.http.delete(`${this.baseUrl}/ActividadControler/${id}`);
  }
}
