import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { AvatarModule } from 'ngx-avatar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Disciplina1Component } from './components/disciplina1/disciplina1.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { RegisterComponent } from './components/users/register/register.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { FrequenciaComponent } from './components/frequencia/frequencia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggedComponent } from './components/logged/logged.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { UserInfoComponent } from './components/users/user-info/user-info.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AddConteudoComponent } from './components/add-conteudo/add-conteudo.component';
import { AddAlunoComponent } from './components/users/add-aluno/add-aluno.component';
import { AddProfessorComponent } from './components/users/add-professor/add-professor.component';
import { EditAlunoComponent } from './components/users/edit-aluno/edit-aluno.component';
import { EditProfessorComponent } from './components/users/edit-professor/edit-professor.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    Page404Component,
    Disciplina1Component,
    ArquivosComponent,
    RegisterComponent,
    MessageBoxComponent,
    ChatComponent,
    MessageComponent,
    FrequenciaComponent,
    LoggedComponent,
    ProfileComponent,
    UserInfoComponent,
    ProgressBarComponent,
    AddConteudoComponent,
    AddAlunoComponent,
    AddProfessorComponent,
    EditAlunoComponent,
    EditProfessorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonToggleModule,
    MatListModule,
    MatCardModule,
    AvatarModule,
    BrowserAnimationsModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
