import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataForm = this.fb.group({
    nombre: [''],
    pass: ['']
  });
  alert : boolean = false;
  erroral:boolean = false;
  message:string = "";
  constructor(private router:Router,
    private fb:FormBuilder,
    private usuarioService: UsuarioService) { 
    this.dataForm = this.fb.group({
      nombre: [''],
      pass: ['']
    })
  }

  ngOnInit(): void {
  }


  iniciar(){
    const data = this.dataForm.value;
    const user = {
      nombre_usuario: data.nombre,
      contrasena: this.usuarioService.encrypt(data.pass)
    }
    this.usuarioService.authUsuario(user).then((res: any) => {
      if (res.estado) {
        this.alert = true;
        this.message = res.mensaje
        localStorage.setItem('user',JSON.stringify(res.data));
        //console.log(res);
        setTimeout(()=>{          
          this.router.navigate(['file']);
        }, 2000);
      }else{
        this.erroral = true;
        this.message = res.mensaje
        setTimeout(()=>{          
          this.erroral = false;
        }, 3000);
      }
    })
    
  }
}
