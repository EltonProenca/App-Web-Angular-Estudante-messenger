import { CursoService } from './../../servicesCurso/curso.service';

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';
import { Key } from 'protractor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExtraService } from 'src/app/services/extra.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SetService } from 'src/app/servicesCurso/set.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseListObservable } from '@angular/fire/firebase-node';
import * as firebase from 'firebase';


@Component({
  selector: 'app-disciplina1',
  templateUrl: './disciplina1.component.html',
  styleUrls: ['./disciplina1.component.css']
})
export class Disciplina1Component implements OnInit {
  public currentUserUid: string;
  currentUser: User;
  arquivosEnviados: Observable<Upload[]>;
  arquivosRecebidos2: any;
  public arquivosRecebidos: FirebaseListObservable<Upload[]>;
  arquivosRecebidosUser: Observable<User[]>;
  selectedFiles: FileList;
  currentUpload: Upload;
  file;
  public fileForm: FormGroup;
  basepath: any;
  public id: string;
  edit: boolean;
  messages: string;
  update: Upload;
  public comentario: string;
  cd: any;
  Materia: string;




  constructor(
    private arquivosService: UploadService,
    private router: Router,
    private route: ActivatedRoute,
    private upSvc: UploadService,
    public message: ExtraService,
    public  formBuilder: FormBuilder,
    public userService: UserService,
    public setService: SetService,
    public angularFireAuth: AngularFireAuth
    ) {
      this.currentUserUid = this.angularFireAuth.auth.currentUser.uid;
    }

    registerForm() {

      this.fileForm = this.formBuilder.group({
      comentario: ['']

    });

  }
  get Comentario() {
    return this.fileForm.get('comentario');
  }
  ResetForm() {
    this.fileForm.reset();
  }

    ngOnInit() {
     this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((user: User) => {
        this.currentUser = user;

      });



      this.arquivosEnviados =  this.arquivosService.getAllEnviados();
      this.arquivosRecebidos = this.arquivosService.getAllRecebidos();
      console.log(this.arquivosEnviados)

      this.Materia = this.setService.getPathMateria();
      this.route.params.subscribe( parametros => {
        if (parametros['id']) {

        }
      });
      this.registerForm();


    }

    setPath() {
      this.basepath = this.setService.setPath(this.currentUser.pathMateria0);
    }



  baixarArquivo( arquivo: Upload) {
    console.log('teste baixar');
   this.arquivosService.baixarArquivo(arquivo);


}

baixarArquivoProf( arquivo: Upload) {
  console.log('teste baixar');
 this.arquivosService.baixarArquivoProf(arquivo);


}
confirmacaoDelete(arquivo: Upload) {
    this.arquivosService.deleteUpload(arquivo);
  }


  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

uploadSingle2() {
 // this.basepath = this.setService.setPath(this.currentUser.pathMateria0);
//  console.log('teste path diciplina =' + this.basepath);

  const formUser = this.fileForm.value;
  this.message.setUpload( formUser.comentario);
 console.log('teste enviar arquivo comentario = ' + formUser.comentario);
  console.log('teste enviar arquivo');
  const file = this.selectedFiles.item(0);
  this.currentUpload = new Upload(file);
  this.upSvc.pushUpload(this.currentUpload);
  this.ResetForm();

}
uploadSingle() {

  this.currentUpload = this.fileForm.value;
  if (!this.edit) {

    const formUser = this.fileForm.value;
    this.message.setUpload( formUser.comentario);
    console.log('teste enviar arquivo comentario = ' + formUser.comentario);
    console.log('teste enviar arquivo');
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
    this.ResetForm();

  } else {
    this.currentUpload = this.fileForm.value;
    this.currentUpload.key = this.id;
    console.log('upload single =' + this.currentUpload.comentario);
    this.upSvc.update(this.currentUpload)
    .then(() => {
      this.messages = `Projeto Atulizado com sucesso!`;
      this.fileForm.reset();
    })
    .catch((erro) => { this.messages = `Erro ao atualizar o projeto: ${erro}`} );
    this.arquivosService.deleteUpdate(this.update);
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);

    const basePath = this.setService.getPath();
    const uploadTask = firebase.storage().ref().child(`${basePath}/${this.currentUserUid}/${this.currentUpload.file.name}`)
    .put(this.currentUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
             this.currentUpload.progress = Math.round(uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
     this.currentUpload.name = file.name;
     this.currentUpload.key = this.id;
     console.log(this.currentUpload.progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        this.currentUpload.url  = downloadURL;
        this.upSvc.update(this.currentUpload);
       });
      }
    );
    this.fileForm.reset();
  }
}

onFile(event): void {
   this.file = event.target.files[0];
}
editProject(p: Upload) {
  this.update = p;
  console.log('Nome Arquivo  editado =' + this.update.name);
  console.log('ID do Arquivo  editado =' + this.update.key);
  this.edit = true;
  this.id = p.key;
   this.fileForm.controls['comentario'].setValue(p.comentario);
  console.log('metodo edite = ' + p.comentario + p.key );

}




}
