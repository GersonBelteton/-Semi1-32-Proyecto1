import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  usuarios: any = [];
  private user: any;
  private users: string | any;
  buscarstate: boolean = false;
  dataForm = this.fb.group({
    nombre: ['']
  });
  constructor(private archivoService: ArchivoService,
    private fb: FormBuilder) {
    this.dataForm = this.fb.group({
      nombre: ['']
    });
  }

  ngOnInit(): void {

    this.users = localStorage.getItem('user');
    this.user = JSON.parse(this.users);
    this.getUsuarios();
  }

  getUsuarios() {
    this.archivoService.getArchivosPublicos(this.user.id_usuario).then((res: any) => {
      this.usuarios = res;
      console.log(res);
    });
  }

  buscar() {
    const data = this.dataForm.value;
    const req = {
      id_usuario: this.user.id_usuario,
      nombre: data.nombre
    }
    this.archivoService.buscarArchivoPublico(req).then((res: any) => {
      console.log(res);
      this.usuarios = res;
      this.buscarstate = true;
    })
  }

  clear() {
    this.getUsuarios();
    this.buscarstate = false;
    this.dataForm = this.fb.group({
      nombre: ['']
    });
  }

}
