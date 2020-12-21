import { ChatComponent } from './../chat/chat.component';
import { Message } from './../../models/message.model';
import { ExtraService } from './../../services/extra.service';
import { MessageService } from 'src/app/services/message.service';

import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { map } from 'rxjs/internal/operators/map';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit  {
  [x: string]: any;

  chats: Observable<Chat[]>;
  users: Observable<User[]>;
  view = 'chats';





  constructor(
    http: HttpClient, private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public chatService: ChatService,
    public userService: UserService,
    public message: ExtraService

  ) {


  }
  ngOnInit() {
   this.users = this.userService.users;
   this.chats = this.chatService.mapListKeys<Chat>(this.chatService.chats)
   .map((chats: Chat[]) => chats.reverse());
   console.log('pagina carregaemto da mensagem' + this.chats);


  // this.menuCtrl.enable(true, 'user-menu');




  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }



  filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.chats = this.chatService.mapListKeys<Chat>(this.chatService.chats)
      map((chats: Chat[]) => chats.reverse());
    this.users = this.userService.users;

    if (searchTerm) {

      switch(this.view) {

        case 'chats':
          this.chats = this.chats
          // tslint:disable-next-line:max-line-length
          .pipe(map((chats: Chat[]) => chats.filter((chat: Chat) => (chat.title && chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1))));

          break;

        case 'users':
          this.users = this.users
          map((users: User[]) => users.filter((user: User) => (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)))
            ;
          break;

      }

    }

  }

  onChatCreate(recipientUser: User): void {
    console.log('recipeinte user onchatecreat 1' + recipientUser);

    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((currentUser: User) => {


        this.chatService
          .mapObjectKey<Chat>(this.chatService.getDeepChat(currentUser.$key, recipientUser.$key))
          .subscribe((chat: Chat) => {

            if (!chat.title) {

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, (currentUser.photo || ''));
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            }

          });

      });
  this.message.setUser( recipientUser);

   console.log('recipeinte user onchatecreat' + recipientUser.name, recipientUser);

setTimeout(() => {
  this.router.navigate(['chat/chat']);
});



      // this.router.navigate(['message-box/message-box', recipientUser, recipientUser]);


  }

  goToChat(user: User){
    this.message.setUser(user);
    // this.router.navigateByUrl('/chat/chat');

  }
    onChatOpen(chat: Chat): void {

    let recipientUserId: string = chat.$key;

    this.userService.mapObjectKey<User>(
      this.userService.get(recipientUserId)
    ).pipe(first())
      .subscribe((user: User) => {
        console.log('onchat = ' + user.name);
        this.message.setUser( user);

setTimeout(() => {
  this.router.navigate(['chat/chat' ]);
});

      });

  }

}
