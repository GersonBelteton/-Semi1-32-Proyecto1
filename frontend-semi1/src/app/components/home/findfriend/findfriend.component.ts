import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-findfriend',
  templateUrl: './findfriend.component.html',
  styleUrls: ['./findfriend.component.css']
})
export class FindfriendComponent implements OnInit {
  usuarios: any = [];
  private user: any;
  buscarstate: boolean = false;
  private users: string | any;
  message: string = "";
  erroral: boolean = false;
  alert: boolean = false;
  dataForm = this.fb.group({
    nombre: ['']
  });
  constructor(private usuarioService: UsuarioService,
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
    this.usuarioService.getUsuarios(this.user.id_usuario).then((res: any) => {
      this.usuarios = res;
    });
  }


  agregarAmigo(id_usuario2: any) {
    const user = {
      id_usuario1: this.user.id_usuario,
      id_usuario2: id_usuario2
    }
    this.usuarioService.agregarAmigo(user).then((res: any) => {
      if (res.estado) {
        this.alert = true;
        this.message = res.mensaje;
        this.getUsuarios();
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      } else {
        this.erroral = true;
        this.message = res.mensaje
        setTimeout(() => {
          this.erroral = false;
        }, 3000);
      }
    });
  }

  buscar() {
    const data = this.dataForm.value;
    this.usuarioService.buscarUsuario(data.nombre).then((res: any) => {
      this.usuarios = [];
      if (res != null) {
        this.usuarios[0] = res;
      }
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
