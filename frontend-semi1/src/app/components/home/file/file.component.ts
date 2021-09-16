import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  private user: any;
  publicFiles: any = [];
  prvateFiles: any = [];
  archivo: string | undefined = "";
  private users: string | any;
  userimg: string = "";
  username: string = "";
  usermail: string = "";
  alert: boolean = false;
  erroral: boolean = false;
  message: string = "";
  statusEdit: boolean = false;
  statusDelete: boolean = false;
  statusInsert: boolean = true;
  extension: string = "";
  currrentId: any;

  dataForm = this.fb.group({
    nombre: [''],
    publico: [''],
    passc: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private archivoService: ArchivoService,
    private usuarioService: UsuarioService
  ) {
    this.dataForm = this.fb.group({
      nombre: [''],
      publico: [''],
      passc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.users = localStorage.getItem('user');
    this.user = JSON.parse(this.users);
    this.userimg = this.user.foto;
    this.username = this.user.nombre_usuario;
    this.usermail = this.user.correo;
    this.getArchivosPrivate();
    this.getArchivosPublic();
  }


  handleUpload(event: any) {
    const file = event.target.files[0];
    this.extension = file.name.split('.')[1];
    this.dataForm = this.fb.group({
      nombre: [file.name.split('.')[0]],
      publico: [this.dataForm.value.publico],
      passc: [this.dataForm.value.passc, Validators.required]
    });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var filestring = reader.result?.toString();
      this.archivo = filestring?.split(',')[1];
    };
  }

  guardar() {
    const data = this.dataForm.value;
    const newfile = {
      nombre_archivo: data.nombre + "." + this.extension,
      tipo: data.publico == true ? 'publico' : 'privado',
      id_usuario: this.user.id_usuario,
      archivo: this.archivo
    }
    if (this.usuarioService.encrypt(data.passc) == this.user.contrasena) {
      this.archivoService.crearArchivo(newfile).then((res: any) => {
        if (res.estado) {
          this.alert = true;
          this.message = res.mensaje;
          this.getArchivosPrivate();
          this.getArchivosPublic();
          setTimeout(() => {
            this.alert = false;
            this.dataForm = this.fb.group({
              nombre: [''],
              publico: [''],
              passc: ['', Validators.required]
            });
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
      this.message = "Contraseña incorrecta"
      setTimeout(() => {
        this.erroral = false;
      }, 3000);
    }

  }

  getArchivosPublic() {
    this.archivoService.obtenerArchivosPublicos(this.user.id_usuario).then((res: any) => {
      this.publicFiles = res;
    });
  }

  getArchivosPrivate() {
    this.archivoService.obtenerArchivosPrivados(this.user.id_usuario)
      .then((res: any) => {
        this.prvateFiles = res;
      })
  }

  eliminaraction(id_archivo: any) {
    this.statusDelete = true;
    this.statusInsert = false;
    this.statusEdit = false;
    this.currrentId = id_archivo;
  }

  agregaraction(){
    this.statusDelete = false;
    this.statusEdit =false;
    this.statusInsert = true;
    this.currrentId = null;
  }

  editaraction(archivo:any){
    this.statusDelete = false;
    this.statusEdit = true;
    this.statusInsert = false;
    this.currrentId = archivo.id_archivo;
    this.dataForm = this.fb.group({
      nombre: [archivo.nombre_archivo.split('.')[0]],
      publico: [archivo.tipo == "publico"?true:false],
      passc: ['' ,Validators.required]
    });
    this.extension = archivo.nombre_archivo.split('.')[1];
  }

  eliminar() {
    const data = this.dataForm.value;
    if (this.usuarioService.encrypt(data.passc) == this.user.contrasena) {
      this.archivoService.eliminarArchivo(this.currrentId)
        .then((res: any) => {
          if (res.estado) {
            this.alert = true;
            this.message = res.mensaje;
            this.getArchivosPrivate();
            this.getArchivosPublic();
            this.agregaraction();
            setTimeout(() => {
              this.alert = false;
            }, 3000);
          } else {
            this.erroral = true;
            console.log(res);
            this.message = res.error;
            setTimeout(() => {
              this.erroral = false;
            }, 3000);
          }
        });
    } else{
      this.erroral = true;
      this.message = "Contraseña incorrecta"
      setTimeout(() => {
        this.erroral = false;
      }, 3000);
    }

  }

  editar() {
    const data = this.dataForm.value;
    const newfile = {
      nombre_archivo: data.nombre + "." + this.extension,
      tipo: data.publico == true ? 'publico' : 'privado',      
      id_archivo: this.currrentId
    }
    if (this.usuarioService.encrypt(data.passc) == this.user.contrasena) {
      this.archivoService.editarArchivo(newfile).then((res: any) => {
        if (res.estado) {
          this.alert = true;
          this.message = res.mensaje;
          this.getArchivosPrivate();
          this.getArchivosPublic();
          setTimeout(() => {
            this.alert = false;
            this.dataForm = this.fb.group({
              nombre: [''],
              publico: [''],
              passc: ['', Validators.required]
            });
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
      this.message = "Contraseña incorrecta"
      setTimeout(() => {
        this.erroral = false;
      }, 3000);
    }

  }

}
