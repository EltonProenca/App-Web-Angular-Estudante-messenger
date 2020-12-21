import { ExtraService } from './../../services/extra.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Message } from 'src/app/models/message.model';
import { Observable } from 'rxjs/Observable';
import { User } from 'src/app/models/user.model';
import { Chat } from 'src/app/models/chat.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {


  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;
  navParams: any;
  extras1: any;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public messageService: MessageService,
    public userService: UserService,
    public paramt: ExtraService,
    private route: ActivatedRoute,
    private extra: ExtraService
  ) {
  }


  ngOnInit() {
    console.log('dados do Extra service = ' + this.extra.getUser());





     this.recipient = this.extra.getUser();
    this.pageTitle = this.recipient.name;


    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
        console.log('chat.ts recipiente =' + this.recipient.name);

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        if (this.recipient.photo) {
          this.chatService
            .mapObjectKey(this.chat1)
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            });
        }

        let doSubscription = () => {
          this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
          this.viewMessages
            .subscribe((messages: Message[]) => {
              this.scrollToBottom();
            });
        };

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .valueChanges()
          .subscribe((messages: Message[]) => {

            if (messages.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

              doSubscription();

            } else {
              doSubscription();
            }

          });

      });


   }


  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }


  sendMessage(newMessage: string): void {

    if (newMessage) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          newMessage,
          currentTimestamp
        ),
        this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

        this.chat2
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });


      });

    }

  }

  private scrollToBottom(): void {
    setTimeout(() => 500);
}
}

