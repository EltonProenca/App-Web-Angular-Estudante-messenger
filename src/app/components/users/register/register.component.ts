import { SetService } from 'src/app/servicesCurso/set.service';
import { Roles } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Path } from 'src/app/models/conteudo/path.model';
import { CursoService } from 'src/app/servicesCurso/curso.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public signupForm: FormGroup;
  professores: Observable<User[]>;
  alunos: Observable<User[]>;
  paths: Observable<Path[]>;
  user: User;
  edit: boolean;
  id: string;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
     this.registerForm();            // Call student form when component is ready
     this.professores =  this.userService.getAllProfessor();
     this.alunos =  this.userService.getAllAluno();
     this.paths =  this.pathService.getAll();
  }


  constructor(public authService: AuthService,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public pathService:  CursoService,
    private router: Router,
    public setUser: SetService,
    public db: AngularFireDatabase) {

     /* const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });*/

  }

  registerForm() {
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        usuario: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      pathMateria5: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria7: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  get Usuario() {
    return this.signupForm.get('usuario');
  }
  get Name() {
    return this.signupForm.get('name');
  }
  get Username() {
    return this.signupForm.get('username');
  }
  get Email() {
    return this.signupForm.get('email');
  }
  get PathMateria5() {
    return this.signupForm.get('pathMateria5');
  }
  get PathMateria7() {
    return this.signupForm.get('pathMateria7');
  }
  get Password() {
    return this.signupForm.get('password');
  }

  ResetForm() {
    this.signupForm.reset();
  }
  onSubmit2() {
    /// this.userService.AddUser(this.signupForm.value); // Submit student data using CRUD API

    this.ResetForm();  // Reset form when clicked on reset button
   }

  onSubmit(): void {
    const formUser = this.signupForm.value;
    const username: string = formUser.username;
    console.log('testes111');

    this.userService.userExists(username).pipe()
       .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authService.registerUser2(
             formUser.email,
             formUser.password
          ).then((authUser: firebase.User) => {


            delete formUser.password;
            const uuid: string = authUser.uid;

            this.userService.AddUser(formUser, uuid)
              .then(() => {
                console.log('user cadastrado== ' + uuid);
                console.log('Usuario cadastrado!');

              }).catch((error: any) => {
                console.log(error);

              });

          });

        } else {

          console.log(`O username ${username} já está sendo usado em outra conta!`);


        }

      });
     // this.ResetForm();

  }
  cadastrarAluno() {

    setTimeout(() => {
      this.router.navigate(['users/addAluno']);
    });
  }
  cadastrarProfessor() {

    setTimeout(() => {
      this.router.navigate(['users/addProfessor']);
    });
  }
  editarAluno(p: User) {
    this.user = p;
    console.log('editar user materia0 =' + this.user.Materia0);
    console.log('editar user materia1 =' + this.user.Materia1);
    this.id = p.$key;

    this.setUser.setUser(this.user);
    setTimeout(() => {
      this.router.navigate(['users/editAluno']);
    });
  }

  editarProfessor(p: User) {
    this.user = p;
    console.log('teste update =' + this.user.name);
    this.id = p.$key;

    this.setUser.setUser(this.user);
    setTimeout(() => {
      this.router.navigate(['users/editProfessor']);
    });


  }

  deleteUser(user: User) {
    return this.db.list(`users/`).remove(user.key)
    .then(() => { firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(function (info) { const user = firebase.auth().currentUser;
        user.delete(); }).then(() => {
         this.authService.loginEmailUser('admin@admin.com', '123456')
         .then((res) => {
           this.onLoginRedirect();
         }).catch(err => console.log('err', err.message));
        }); }); }

        onLoginRedirect(): void {
          this.router.navigate(['user/register']);
        }


}
