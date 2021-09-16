import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-findfriend',
  templateUrl: './findfriend.component.html',
  styleUrls: ['./findfriend.component.css']
})
export class FindfriendComponent implements OnInit {
  usuarios:any = [];
  private user:any;
  private users: string | any;
  message:string ="";
  erroral:boolean = false;
  alert:boolean = false;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.users = localStorage.getItem('user');
    this.user = JSON.parse(this.users);
    this.getUsuarios();
  }


  getUsuarios(){
    this.usuarioService.getUsuarios(this.user.id_usuario).then((res:any)=>{
      this.usuarios = res;
    });
  }


  agregarAmigo(id_usuario2:any){
    const user = {
      id_usuario1:this.user.id_usuario,
      id_usuario2:id_usuario2
    }
    this.usuarioService.agregarAmigo(user).then((res:any)=>{
      if (res.estado) {
        this.alert = true;
        this.message = res.mensaje;
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

}
