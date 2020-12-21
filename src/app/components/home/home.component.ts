import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { SetService } from 'src/app/servicesCurso/set.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  basepath: any;
  basepathProf: any;
  curso: String ;
  materia0: String ;
  materia1: String ;
  materia2: String ;
  materia3: String ;
  materia4: String ;
  materia5: String ;
  materia6: String ;
  materia7: String ;
 public usuario: String;
 public usuarioAdmin: String = 'admin';
 public usuarioAluno: String = 'aluno';
 public usuarioProfessor: String = 'professor';
  public isLogged: boolean = false;
  AdminLogged: boolean;
  usuarioLogged: boolean;
  basepathUsers: void;

  constructor(private dataApi: DataApiService,
    public userService: UserService,
    public setService: SetService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
      this.userService
    .mapObjectKey<User>(this.userService.currentUser)
    .subscribe((user: User) => {
      this.currentUser = user;
      this.usuario = user.usuario;
    });


     }
  public books = [];
  public book = '';

  ngOnInit() {

    this.userService
    .mapObjectKey<User>(this.userService.currentUser)
    .subscribe((user: User) => {
      this.currentUser = user;
      this.curso = user.curso;
      this.materia0 = user.Materia0;
      this.materia1 = user.Materia1;
      this.materia2 = user.Materia2;
      this.materia3 = user.Materia3;
      this.materia4 = user.Materia4;
      this.materia5 = user.Materia5;
      this.materia6 = user.Materia6;
      this.materia7 = user.Materia7;
      });

    this.dataApi.getAllBooks().subscribe(books => {
     // console.log('BOOKS', books);
      console.log('HOME');
      this.books = books;
    });
    this.getCurrentUser();
   }
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }
  getUser2() {

    console.log('antes get=');
    if (this.usuario === this.usuarioAluno || this.usuario === this.usuarioProfessor) {
  console.log(' Aluno/Professor logged');
  this.usuarioLogged = true;
  console.log('user home=' + this.usuario);
  } else {
  console.log('NOT Aluno/Professorlogged home');
  this.usuarioLogged = false;
  alert('você não esta logado!! :(');
  console.log('user home=' + this.usuario);
  }
}
getUser() {

  console.log('antes get=')
  if (this.usuario === this.usuarioAdmin) {
console.log('admin logged');
this.AdminLogged = true;
console.log('user home=' + this.usuario);
} else {
console.log('NOT admin logged home');
this.AdminLogged = false;
alert('você não tem permissão!! :(');
console.log('user home=' + this.usuario);
}
}
  setPath0() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria0);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria0 );
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia0);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria0);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath1() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria1);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria1);
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia1);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria1);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath2() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria2);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria2);
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia2);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria2);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath3() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria3);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria3);
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia3);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria3);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath4() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria4);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria4);
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia4);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria4);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath5() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria5);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria5 );
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia5);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria5);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath6() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria6);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria6);
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia6);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria6);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  setPath7() {
    this.basepath = this.setService.setPath(this.currentUser.pathMateria7);
    this.basepathProf = this.setService.setPathProf(this.currentUser.pathMateria7 );
    this.basepathUsers = this.setService.setPathUsers(this.currentUser.pathMateria0);
    this.setService.setPathMateria(this.currentUser.Materia7);
    this.setService.setExtras(this.currentUser.usuario);
    this.setService.setId(this.currentUser.$key);
    this.setService.setIdProf(this.currentUser.pathProfMateria7);
    setTimeout(() => {
      this.router.navigate(['disciplina1/disciplina1']);
    });
  }
  irCadastroDisciplinas() {
     setTimeout(() => {
      this.router.navigate(['adicionarConteudo']);
    });
  }
  irRegister() {
    setTimeout(() => {
     this.router.navigate([ 'user/register']);
   });
 }



}
