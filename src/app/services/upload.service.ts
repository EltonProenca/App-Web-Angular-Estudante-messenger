import { Injectable, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import { ExtraService } from './extra.service';
import { UserService } from './user.service';
import { SetService } from '../servicesCurso/set.service';
import { FirebaseApp } from '@angular/fire';
@Injectable({
  providedIn: 'root'
})
export class UploadService  {
  public currentUserUid: string;
  public outroUserUid: string;
  private basePath: String;
  uploads: Observable<Upload[]>;
  private url = String;
  comentarioArquivo: string;
  public currentUser: User;
  public currentUserPath: User;
  public usuario: String;
  public id: String;
  public usuarioAluno: String = 'aluno';

  private uploadListRef;
  usertRef;
  uploadRef: any;
  list: any[];
  public users: User[];
  public IdProf: string;
  public tipoUsuario: string;

  constructor(private db: AngularFireDatabase, public angularFireAuth: AngularFireAuth,
    private extra: ExtraService,
    public userService: UserService,
    public setService: SetService,
    @Inject(FirebaseApp) public firebaseApp: any) {
    this.currentUserUid = this.angularFireAuth.auth.currentUser.uid;
    this.outroUserUid = this.angularFireAuth.auth.currentUser.email;



  }


  getAllEnviados2() {
const path = this.setService.getPath();
    console.log('teste seriço base path');

    return this.db.list<Upload>(`${path}/${this.currentUserUid}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  getAllEnviados() {
    const path = this.setService.getPath();
        console.log('teste seriço base path');

        return this.db.list<Upload>(`${path}/`,
         ref => ref.orderByChild('keyUser').equalTo(`${this.currentUserUid}`))
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
          );

  }


  getAllProfessor() {
    console.log('teste seriço');
    return this.db.list<User>(`users/`,
    ref => ref.orderByChild('usuario').equalTo('professor') )
      .snapshotChanges()

        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

  }


  getAllRecebidos() {
    const path = this.setService.getPathProf();
    const pathUser = this.setService.getPathUsers();
    const usuario = this.setService.getExtras();
    const IdUser = this.setService.getId();
    const IdProf = this.setService.getIdProf();
    console.log('teste seriço2');
    console.log('verificar path =' + path);
    console.log('verificar pathUser =' + pathUser);
    console.log('verificar usuario =' + usuario);

    if(usuario === this.usuarioAluno ) {
      console.log('caiu no primeiro if');
      return this.db.list<Upload>(`${pathUser}`,
      ref => ref.orderByChild('keyUser').equalTo(`${IdProf}`))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );

    } else {
      console.log('caiu no primeiro else');
      const user = this.users;
      return this.db.list<Upload>(`${pathUser}/`,
      ref => ref.orderByChild('tipoUsuario').equalTo('aluno'))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );

    }
  }
  getAllRecebidos2(){
    const pathUser = this.setService.getPathUsers();
    const listDb = this.db.database.ref(`${pathUser}`);
    listDb.on('value', (snapshot) => {
      const arquivos = snapshot.val();
      if(arquivos){
        this.list = Object.keys(arquivos).map( i =>{
          arquivos[i]._id = i;
          console.log(arquivos[i]);
          return arquivos[i];
        })
      }

    });
  }



  baixarArquivo(dowload: Upload) {

    this.dowFileStorage(dowload.name);

  }

    // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private dowFileStorage(name: string) {
    const path = this.setService.getPath();
   firebase.storage().ref().child(`${path}/${this.currentUserUid}/${name}`).getDownloadURL().then(url =>{

      window.open(url);

      console.log(url);
    });
  }

  baixarArquivoProf(dowload: Upload) {

    this.dowFileStorageProf(dowload.keyUser, dowload.name);

  }

    // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private dowFileStorageProf(key: string, name: string) {
    const path = this.setService.getPathProf();
   firebase.storage().ref().child(`${path}/${key}/${name}`).getDownloadURL().then(url =>{

      window.open(url);

      console.log(url);
    });
  }



  pushUpload(upload: Upload) {
    const basePath = this.setService.getPath();
    const uploadTask = firebase.storage().ref().child(`${basePath}/${this.currentUserUid}/${upload.file.name}`).put(upload.file);
    this.comentarioArquivo = this.extra.getUpload();
    this.IdProf = this.setService.getIdProf();
    this.tipoUsuario = this.setService.getExtras();

    console.log('comentario  extraservice =' + this.extra.getUpload());
    console.log('comentario =' + this.comentarioArquivo);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
     upload.progress = Math.round(uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
     console.log(upload.progress);
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
       // upload.url = uploadTask.snapshot.downloadURL;
       // upload.url =  uploadTask.snapshot.ref.getDownloadURL();

      upload.name = upload.file.name;
       // upload.comentario = upload.comentario;
       upload.comentario = this.comentarioArquivo;
       upload.keyUser = this.currentUserUid;
       upload.user = this.outroUserUid;
       upload.IdProf = this.IdProf;
       upload.tipoUsuario = this.tipoUsuario;


      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
         upload.url = downloadURL;
        // upload.comentario = upload.comentario;
         this.saveFileData(upload);
        console.log('URL:' + upload.url);
       });
      }
    );
  }



  // Escrever detalhes no  realtime db
   saveFileData(upload: Upload) {
    const basePath = this.setService.getPath();
     console.log('path savefile' + basePath);
    this.uploadListRef = this.db.list<Upload>(`${basePath}/`);
    return this.uploadListRef.push(upload);
  }

  deleteUpload(upload: Upload) {
    console.log(upload.key);
    this.deleteFileData(upload.key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error));
  }

  // Deletar detalhes do firebase realtime db
  private deleteFileData(name: string) {
    const path = this.setService.getPath();
    return this.db.list(`${path}/`).remove(name);
  }

  // deletar detalhes do firebase storage

  private deleteFileStorage(name: string) {
    const path = this.setService.getPath();
    const storageRef = firebase.storage().ref();
    storageRef.child(`${path}/${this.currentUserUid}/${name}`).delete();

  }

  AddUser(user: User) {
    console.log('usuario cadastado');
    console.log(user.name);
    this.usertRef = this.db.list<User>(`novouser/`);
    return this.usertRef.push({
      Name: user.name,
      ra: user.ra,
      email: user.email
    });
  }
  update(upload: Upload): Promise<void> {
    const basePath = this.setService.getPath();
    console.log('update service =' + upload.name)
    return this.db.object(`${basePath}/${upload.key}`)
    .update( upload);

  }
  deleteUpdate(upload: Upload) {
    console.log('delete upload' + upload.key);

      this.deleteFileStorageUpdate(upload.name);
  }
  private deleteFileStorageUpdate(name: string) {
    const path = this.setService.getPath();
    const storageRef = firebase.storage().ref();
    storageRef.child(`${path}/${this.currentUserUid}/${name}`).delete();

  }
  uploadFile(upload: Upload): firebase.storage.UploadTask {
    const basePath = this.setService.getPath();
    return this.firebaseApp
      .storage()
      .ref()
      .child(`${basePath}/${this.currentUserUid}/${upload.file.name}`)
      .put(upload.file);
  }






}
