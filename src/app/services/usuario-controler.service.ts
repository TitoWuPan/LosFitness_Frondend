import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioControler } from '../models/UsuarioControler';

@Injectable({
  providedIn: 'root'
})
export class UsuarioControlerService {
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllUsuarioControler():Observable<UsuarioControler[]>{
    return this.http.get<UsuarioControler[]>(this.baseUrl);
  }


  addUsuarioControler(usuarioControler:UsuarioControler):Observable<UsuarioControler>{
    return this.http.post<UsuarioControler>(this.baseUrl,usuarioControler);

  }  
  updateUsuarioControler(id:number,usuarioControler:UsuarioControler):Observable<UsuarioControler>{
    return this.http.put<UsuarioControler>(`${this.baseUrl}/${id}`, usuarioControler);
  }

  deleteUsuarioControler(id:Number):Observable<UsuarioControler>{
    return this.http.delete(`${this.baseUrl}/${id}`);

  }



}
