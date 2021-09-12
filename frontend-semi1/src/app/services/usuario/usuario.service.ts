import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from 'src/app/config.module';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private basepath:string = path.path;

  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {}
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  crearUsuario(usuario:any) {
    return this.request('POST', `${this.basepath}/usuario/create`, usuario);
  }

  authUsuario(usuario:any) {
    return this.request('POST', `${this.basepath}/usuario/auth`, usuario);
  }

}
