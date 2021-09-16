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
    pass: [''],
    passc: ['']
  })

  alert: boolean = false;
  erroral: boolean = false;
  message: string = "";

  profile: string | undefined = "";

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) {
    this.dataForm = this.fb.group({
      correo: [''],
      nombre: [''],
      pass: [''],
      passc: ['']
    })
  }

  ngOnInit(): void {
  }

  crear() {
    const data = this.dataForm.value;
    const user = {
      nombre_usuario: data.nombre,
      foto: this.profile,
      correo: data.correo,
      contrasena: this.usuarioService.encrypt(data.pass)
    }
    if (data.passc == data.pass && this.profile != "") {
      this.usuarioService.crearUsuario(user).then((res: any) => {
        if (res.estado) {
          this.alert = true;
          this.message = res.mensaje;
          this.dataForm = this.fb.group({
            correo: [''],
            nombre: [''],
            pass: [''],
            passc: ['']
          });
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        } else {
          this.erroral = true;
          this.message = res.mensaje
          setTimeout(() => {
            this.erroral = false;
          }, 3000);
        }
      });
    } else {
      this.erroral = true;
      if (this.profile == "") {
        this.message = "Sleccione una Fotografía";
      } else {
        this.message = "Contraseña no coincide";
      }
      setTimeout(() => {
        this.erroral = false;
      }, 3000);
    }

  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //TODO save the base64 data in local
      var filestring = reader.result?.toString();
      this.profile = filestring?.split(',')[1];
      //console.log(this.profile);
    };
  }
}
