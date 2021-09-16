import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from 'src/app/config.module';
import * as CryptoJs from 'crypto-js';

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

  encrypt(pass:string): string {
    var key = CryptoJs.enc.Utf8.parse("semi1g32");
    var iv = CryptoJs.enc.Utf8.parse("semi1g32");
    var enc = CryptoJs.AES.encrypt(CryptoJs.enc.Utf8.parse(pass),key, {
      keySize: 128/8,
      iv : iv,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7
    });
    return enc.toString(); 
  }


  getUsuarios(id_usuario:any) {
    return this.request('GET', `${this.basepath}/usuario/get_all`);
  }


  agregarAmigo(usuario:any) {
    return this.request('POST', `${this.basepath}/usuario/agregar_amigo`, usuario);
  }
}
