import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBase = environment.apiBase;
  constructor(private http : HttpClient) { }
  
   get(id : string) : Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiBase}/Usuario`);
  }
  getAllGenres(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiBase}/${1}`);
  }
  add(id : number) : Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiBase}/${id}`,id);
  }//se puede hacer $ video 17:34
  update(id : number) : Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiBase}/${id}`,id);
  }
   delete(id : number) : Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiBase}/${id}`);
  }
}
