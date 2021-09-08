import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as CryptoJs from 'crypto-js';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  dataForm = this.fb.group({
    correo: [''],
    nombre: [''],
    pass: ['']
  })

  alert: boolean = false;
  message:string ="";

  profile: string | undefined = "";

  constructor(
    private fb: FormBuilder, 
    private ususarioService: UsuarioService,
    private router:Router) {
    this.dataForm = this.fb.group({
      correo: [''],
      nombre: [''],
      pass: ['']
    })
  }

  ngOnInit(): void {
  }

  crear() {
    //TODO send data to user service
    //console.log(this.dataForm.value) 
    const data = this.dataForm.value;
    const user = {
      nombre_usuario: data.nombre,
      foto: this.profile,
      correo: data.correo,
      contrasena: CryptoJS.AES.encrypt(data.pass, 'semi1g32').toString()
    }
    console.log(user);
    this.ususarioService.crearUsuario(user).then((res: any) => {
      if (res.estado) {
        this.alert = true;
        this.message = res.mensaje
        setTimeout(()=>{this.router.navigate(['login'])}, 5000);
      }else{
        
      }
    })
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //TODO save the base64 data in local
      this.profile = reader.result?.toString();
    };
  }
}
