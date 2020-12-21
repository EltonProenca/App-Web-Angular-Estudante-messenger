import { Upload } from 'src/app/models/upload';
import { User } from 'src/app/models/user.model';
import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  extras: any;
  upload: string;
  private user: User;
  private chat: Chat;


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
setUser(user: User) {
  this.user = user;

}

getUser() {
  return this.user;

}


}
