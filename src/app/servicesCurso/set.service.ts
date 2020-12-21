import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';
import { Path } from '../models/conteudo/path.model';

@Injectable({
  providedIn: 'root'
})
export class SetService {
  path: string;
  pathProf: string;
  pathUsers: string;
  extras: any;
  upload: string;
  pathMateria: string;
  private user: any;
  private chat: any;
  pathUpdate: Path;
  id: string;
  idProf: string;


  constructor() { }

  public setExtras(data) {
    this.extras = data;


    console.log('setextra valor = ' + this.extras );

  }

  public getExtras() {
    return this.extras;

  }
  public setUpload(data: string) {
    this.upload = data;


    console.log('setUpload valor = ' + this.upload );

  }

  public getUpload() {
    return this.upload;

  }
setUser(user: any) {
  this.user = user;
  console.log('set path service' + this.user);

}

getUser() {
  return this.user;

}


setPath(path: string) {
  this.path = path;
  console.log('set path service' + this.path);

}

getPath() {
  return this.path;

}
setPathProf(pathProf: string) {
  this.pathProf = pathProf;
  console.log('set path service' + this.pathProf);

}

getPathProf() {
  return this.pathProf;

}
setPathUsers(pathUsers: string) {
  this.pathUsers = pathUsers;
  console.log('set path service' + this.pathUsers);

}

getPathUsers() {
  return this.pathUsers;

}
setPathMateria(pathMateria: string) {
  this.pathMateria = pathMateria;
  console.log('set path materia service' + this.pathMateria);

}

getPathMateria() {
  return this.pathMateria;

}
setPathUpdate( pathUpdate: Path) {
  this.pathUpdate =  pathUpdate;
  console.log('set path do editar disciplina' + this.pathUpdate);

}

getPathUpdate() {
  return this.pathUpdate;

}

setId( id: string) {
  this.id =  id;
  console.log('set Id usuario' + this.id);

}

getId() {
  return this.id;

}
setIdProf( idProf: string) {
  this.idProf =  idProf;
  console.log('set Id Professor' + this.idProf);

}

getIdProf() {
  return this.idProf;

}





}
