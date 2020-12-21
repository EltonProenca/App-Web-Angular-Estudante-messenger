

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from 'src/app/components/users/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import {Disciplina1Component} from './components/disciplina1/disciplina1.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { RegisterComponent } from './components/users/register/register.component';
import { MessageComponent } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { FrequenciaComponent } from './components/frequencia/frequencia.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { AddConteudoComponent } from './components/add-conteudo/add-conteudo.component';
import { AddAlunoComponent } from './components/users/add-aluno/add-aluno.component';
import { AddProfessorComponent } from './components/users/add-professor/add-professor.component';
import { EditAlunoComponent } from './components/users/edit-aluno/edit-aluno.component';
import { EditProfessorComponent } from './components/users/edit-professor/edit-professor.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'disciplina1/disciplina1', component: Disciplina1Component, canActivate: [AuthGuard]},
  {path: 'arquivos/arquivos', component: ArquivosComponent, canActivate: [AuthGuard]},
  { path: 'user/register', component: RegisterComponent,  canActivate: [AuthGuard] },
  { path: 'message/message', component: MessageComponent,  canActivate: [AuthGuard] },
  { path: 'chat/chat', component: ChatComponent,  canActivate: [AuthGuard] },
  { path: 'messagebox/messagebox', component: MessageBoxComponent,  canActivate: [AuthGuard] },
  { path: 'frequencia/frequencia', component: FrequenciaComponent,  canActivate: [AuthGuard] },
  { path: 'adicionarConteudo', component: AddConteudoComponent,  canActivate: [AuthGuard] },
  { path: 'users/addAluno', component: AddAlunoComponent,  canActivate: [AuthGuard] },
  { path: 'users/addProfessor', component: AddProfessorComponent,  canActivate: [AuthGuard] },
  { path: 'users/editAluno', component: EditAlunoComponent,  canActivate: [AuthGuard] },
  { path: 'users/editProfessor', component: EditProfessorComponent,  canActivate: [AuthGuard] },



  { path: 'user/login', component: LoginComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
