import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {


  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient
  ) {
    super();
  }




  create(message: Message, listMessages: AngularFireList<Message>) {
    return Promise.resolve(listMessages.push(message));
}

  getMessages(userId1: string, userId2: string): AngularFireList<Message> {
    console.log('get Messages Userservice =' + userId1, userId2);
    return this.db.list(`/messages/${userId1}-${userId2}`,
      (ref: firebase.database.Reference) => ref.limitToLast(30).orderByChild('timestamp')
    );
  }

}
