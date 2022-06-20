import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Usuario} from 'src/app/models/models';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBase = environment.apiBase;
  constructor(private http : HttpClient) { }


  get(id : number) : Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiBase}/usuario/${id}`);
  }
  delete(id : number) : Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiBase}/usuario/drop/${id}`);
  }
}
