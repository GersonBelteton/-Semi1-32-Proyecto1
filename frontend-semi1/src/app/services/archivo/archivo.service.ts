import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { path } from 'src/app/config.module';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
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

  crearArchivo(archivo:any) {
    return this.request('POST', `${this.basepath}/archivo/create`, archivo);
  }

  obtenerArchivosPublicos(idUsuario:any){
    return this.request('GET', `${this.basepath}/archivo/get_all_by_type/${idUsuario}/publico`);
  }

  obtenerArchivosPrivados(idUsuario:any){
    return this.request('GET', `${this.basepath}/archivo/get_all_by_type/${idUsuario}/privado`);
  }

  eliminarArchivo(id_archivo:any){
    return this.request('DELETE',`${this.basepath}/archivo/delete/${id_archivo}`);
  }

  editarArchivo(archivo:any){
    return this.request('PUT',`${this.basepath}/archivo/update_name_type`, archivo);
  }


  getArchivosPublicos(id_usuario:any){
    return this.request('GET', `${this.basepath}/archivo/get_archivos_amigos/${id_usuario}`);
  }

  buscarArchivoPublico(req:any){
    return this.request('GET', `${this.basepath}/archivo/get_archivos_amigos_by_name/${req.id_usuario}/${req.nombre}`);
  }
}
