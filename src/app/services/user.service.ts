import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';


import { Observable, ReplaySubject } from 'rxjs';
// import { map } from 'rxjs/operators/map';

import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';


import { User } from './../models/user.model';

import * as firebase from 'firebase/app';
import 'firebase/storage';

import { pipe } from '@angular/core/src/render3';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService  {


  usersRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  private userRef;

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    @Inject(FirebaseApp) public firebaseApp: any,
    public http: HttpClient
  ) {
    super();
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/users`,
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
    .map((users: User[]) => {
      return users.filter((user: User) => user.$key !== uidToExclude);
    });
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          console.log('Auth state alterado!', authUser.uid);
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
          this.setUsers(authUser.uid);
        }
      });
  }


  create(user: User, uuid: string): Promise<void> {
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  edit(user: {name: string, ra: string, photo: string}): Promise<void> {
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError);
  }

  userExists(ra: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('name').equalTo(ra)
    )
    .valueChanges()
    .map((users: User[]) => {
      return users.length > 0;
    });
  }

  get(userId: string): AngularFireObject<User> {
    return this.db.object<User>(`/users/${userId}`);
  }

  getAll() {
    console.log('teste serviço');
    return this.db.list<User>(`users/`,
    ref => ref.orderByChild('name'))
      .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

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
  getAllAluno() {
    console.log('teste seriço');
    return this.db.list<User>(`users/`,
    ref => ref.orderByChild('usuario').equalTo('aluno') )
      .snapshotChanges()

        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

  }


  uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/users/${userId}`)
      .put(file);
  }


  AddUser(user: User, uuid: string): Promise<firebase.User>  {
    console.log('usuario cadastado');
    console.log(user.name);
    this.userRef = this.db.object(`users/${uuid}`);
    return this.userRef.set(user, user.key = uuid);
  }

  private setUsers2(uidToExclude: string): void {

      this.db.list<User>(`/users`,
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      ).valueChanges()
      .map((users: User[]) => {
          return users.filter((user: User) => user.$key !== uidToExclude);
        });
  }

  update(user: User){
    console.log('update user =' + user.pathProfMateria0);
     return this.db.object(`users/${user.key}`)
     .update( user);

  }

  deleteUser(user: User){
    console.log('deletando user no service =' + user.name);
    this.deleteFileUser(user.key).then(() => {
     this.deleteUidUser(user.email, user.password);
     });



  }

  deleteFileUser(key: string){
    console.log('delete user key =' + key);
    return this.db.list(`users/${key}`).remove();
  }
  deleteUidUser(email: string, password: string) {
    console.log('delete user email =' + email);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (info) {
       const user = firebase.auth().currentUser;
       user.delete();
    });

  }

}
