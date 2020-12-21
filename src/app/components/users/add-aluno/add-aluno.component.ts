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

@Component({
  selector: 'app-add-aluno',
  templateUrl: './add-aluno.component.html',
  styleUrls: ['./add-aluno.component.css']
})
export class AddAlunoComponent implements OnInit {

  public signupForm: FormGroup;
  usuarios: Observable<User[]>;
  paths: Observable<Path[]>;
  tes1: string ;
  tes2: string;
  tes3: string;
  messages: string;
  materia0: string;
  pathmateria0: string;
  Nomemateria0: string;
  Nomemateria1: string;
  Nomemateria2: string;
  Nomemateria3: string;
  Nomemateria4: string;
  Nomemateria5: string;
  Nomemateria6: string;
  Nomemateria7: string;
  idmateria0: string;
  idmateria1: string;
  idmateria2: string;
  idmateria3: string;
  idmateria4: string;
  idmateria5: string;
  idmateria6: string;
  idmateria7: string;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
     this.registerForm();            // Call student form when component is ready
     this.usuarios =  this.userService.getAllProfessor();
     this.paths =  this.pathService.getAll();
  }


  constructor(public authService: AuthService,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public pathService:  CursoService,
    private router: Router) {
  }

  registerForm() {
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
      usuario: ['aluno'],
      name: ['', [Validators.required, Validators.minLength(3)]],
      ra: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      curso: ['', [Validators.required]],
      Curso0: ['', [Validators.required, Validators.minLength(3)]],
      Curso1: ['', [Validators.required, Validators.minLength(3)]],
      Curso2: ['', [Validators.required, Validators.minLength(3)]],
      Curso3: ['', [Validators.required, Validators.minLength(3)]],
      Curso4: ['', [Validators.required, Validators.minLength(3)]],
      Curso5: ['', [Validators.required, Validators.minLength(3)]],
      Curso6: ['', [Validators.required, Validators.minLength(3)]],
      Curso7: ['', [Validators.required, Validators.minLength(3)]],
      Periodo0: ['', [Validators.required, Validators.minLength(3)]],
      Periodo1: ['', [Validators.required, Validators.minLength(3)]],
      Periodo2: ['', [Validators.required, Validators.minLength(3)]],
      Periodo3: ['', [Validators.required, Validators.minLength(3)]],
      Periodo4: ['', [Validators.required, Validators.minLength(3)]],
      Periodo5: ['', [Validators.required, Validators.minLength(3)]],
      Periodo6: ['', [Validators.required, Validators.minLength(3)]],
      Periodo7: ['', [Validators.required, Validators.minLength(3)]],
      Materia0: ['', [Validators.required, Validators.minLength(3)]],
      Materia1: ['', [Validators.required, Validators.minLength(3)]],
      Materia2: ['', [Validators.required, Validators.minLength(3)]],
      Materia3: ['', [Validators.required, Validators.minLength(3)]],
      Materia4: ['', [Validators.required, Validators.minLength(3)]],
      Materia5: ['', [Validators.required, Validators.minLength(3)]],
      Materia6: ['', [Validators.required, Validators.minLength(3)]],
      Materia7: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria0: ['', [Validators.required, Validators.minLength(3)] ],
      pathMateria1: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria2: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria3: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria4: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria5: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria6: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria7: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria0: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria1: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria2: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria3: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria4: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria5: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria6: ['', [Validators.required, Validators.minLength(3)]],
      pathProfMateria7: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get Usuario() {
    return this.signupForm.get('usuario');
  }
  get Name() {
    return this.signupForm.get('name');
  }
  get Ra() {
    return this.signupForm.get('ra');
  }
  get Email() {
    return this.signupForm.get('email');
  }
  get Curso() {
    return this.signupForm.get('curso');
  }
  get Curso0() {
    return this.signupForm.get('Curso0');
  }
  get Curso1() {
    return this.signupForm.get('Curso1');
  }
  get Curso2() {
    return this.signupForm.get('Curso2');
  }
  get Curso3() {
    return this.signupForm.get('Curso3');
  }
  get Curso4() {
    return this.signupForm.get('Curso4');
  }
  get Curso5() {
    return this.signupForm.get('Curso5');
  }
  get Curso6() {
    return this.signupForm.get('Curso6');
  }
  get Curso7() {
    return this.signupForm.get('Curso7');
  }
  get Periodo0() {
    return this.signupForm.get('Periodo0');
  }
  get Periodo1() {
    return this.signupForm.get('Periodo1');
  }
  get Periodo2() {
    return this.signupForm.get('Periodo2');
  }
  get Periodo3() {
    return this.signupForm.get('Periodo3');
  }
  get Periodo4() {
    return this.signupForm.get('Periodo4');
  }
  get Periodo5() {
    return this.signupForm.get('Periodo5');
  }
  get Periodo6() {
    return this.signupForm.get('Periodo6');
  }
  get Periodo7() {
    return this.signupForm.get('Periodo7');
  }
  get Materia0() {
    return this.signupForm.get('Materia0');
  }
  get Materia1() {
    return this.signupForm.get('Materia1');
  }
  get Materia2() {
    return this.signupForm.get('Materia2');
  }
  get Materia3() {
    return this.signupForm.get('Materia3');
  }
  get Materia4() {
    return this.signupForm.get('Materia4');
  }
  get Materia5() {
    return this.signupForm.get('Materia5');
  }
  get Materia6() {
    return this.signupForm.get('Materia6');
  }
  get Materia7() {
    return this.signupForm.get('Materia7');
  }
  get PathMateria0() {
    return this.signupForm.get('pathMateria0');
  }
  get PathMateria1() {
    return this.signupForm.get('pathMateria1');
  }
  get PathMateria2() {
    return this.signupForm.get('pathMateria2');
  }
  get PathMateria3() {
    return this.signupForm.get('pathMateria3');
  }
  get PathMateria4() {
    return this.signupForm.get('pathMateria4');
  }
  get PathMateria5() {
    return this.signupForm.get('pathMateria5');
  }
  get PathMateria6() {
    return this.signupForm.get('pathMateria6');
  }
  get PathMateria7() {
    return this.signupForm.get('pathMateria7');
  }
  get PathProfMateria0() {
    return this.signupForm.get('pathProfMateria0');
  }
  get PathProfMateria1() {
    return this.signupForm.get('pathProfMateria1');
  }
  get PathProfMateria2() {
    return this.signupForm.get('pathProfMateria2');
  }
  get PathProfMateria3() {
    return this.signupForm.get('pathProfMateria3');
  }
  get PathProfMateria4() {
    return this.signupForm.get('pathProfMateria4');
  }
  get PathProfMateria5() {
    return this.signupForm.get('pathProfMateria5');
  }
  get PathProfMateria6() {
    return this.signupForm.get('pathProfMateria6');
  }
  get PathProfMateria7() {
    return this.signupForm.get('pathProfMateria7');
  }
  get Password() {
    return this.signupForm.get('password');
  }

  ResetForm() {
    this.signupForm.reset();
  }
  onSubmit(): void {
    const formUser = this.signupForm.value;
    const ra: string = formUser.ra;
    console.log('testes111');

    this.userService.userExists(ra).pipe()
       .subscribe((userExists: boolean) => {
        if (!userExists) {
          this.authService.registerUser2(
             formUser.email,
             formUser.password
          ).then((authUser: firebase.User) => {
            const uuid: string = authUser.uid;
            this.userService.AddUser(formUser, uuid)
              .then(() => {
                this.salvarPathmateria(formUser);
                console.log('user cadastrado== ' + uuid);
                console.log('Usuario cadastrado!');
              }).catch((error: any) => {
                console.log(error);
              });
          });
        } else {
          console.log(`O username ${ra} já está sendo usado em outra conta!`);
        }

      });
      setTimeout(() => {
        this.router.navigate([ 'user/register']);
      });

  }
  salvarPathmateria(user: User) {
    const [ Nomemateria0, IdMateria0] = this.Materia0.value.split('_');
    const [ Nomemateria1, IdMateria1] = this.Materia1.value.split('_');
    const [ Nomemateria2, IdMateria2] = this.Materia2.value.split('_');
    const [ Nomemateria3, IdMateria3] = this.Materia3.value.split('_');
    const [ Nomemateria4, IdMateria4] = this.Materia4.value.split('_');
    const [ Nomemateria5, IdMateria5] = this.Materia5.value.split('_');
    const [ Nomemateria6, IdMateria6] = this.Materia6.value.split('_');
    const [ Nomemateria7, IdMateria7] = this.Materia7.value.split('_');
    this.Nomemateria0 = Nomemateria0;
    this.Nomemateria1 = Nomemateria1;
    this.Nomemateria2 = Nomemateria2;
    this.Nomemateria3 = Nomemateria3;
    this.Nomemateria4 = Nomemateria4;
    this.Nomemateria5 = Nomemateria5;
    this.Nomemateria6 = Nomemateria6;
    this.Nomemateria7 = Nomemateria7;
    this.idmateria0 = IdMateria0;
    this.idmateria1 = IdMateria1;
    this.idmateria2 = IdMateria2;
    this.idmateria3 = IdMateria3;
    this.idmateria4 = IdMateria4;
    this.idmateria5 = IdMateria5;
    this.idmateria6 = IdMateria6;
    this.idmateria7 = IdMateria7;

     console.log('Salvar path materia =' + user.Materia0);
     console.log('Salvar path materia =' + user.pathMateria0);

    user.pathMateria0 = ( this.Curso0.value + '/' + this.Periodo0.value + '/' + this.idmateria0 );
    user.pathMateria1 = ( this.Curso1.value + '/' + this.Periodo1.value + '/' + this.idmateria1 );
    user.pathMateria2 = ( this.Curso2.value + '/' + this.Periodo2.value + '/' + this.idmateria2 );
    user.pathMateria3 = ( this.Curso3.value + '/' + this.Periodo3.value + '/' + this.idmateria3 );
    user.pathMateria4 = ( this.Curso4.value + '/' + this.Periodo4.value + '/' + this.idmateria4 );
    user.pathMateria5 = ( this.Curso5.value + '/' + this.Periodo5.value + '/' + this.idmateria5 );
    user.pathMateria6 = ( this.Curso6.value + '/' + this.Periodo6.value + '/' + this.idmateria6 );
    user.pathMateria7 = ( this.Curso7.value + '/' + this.Periodo7.value + '/' + this.idmateria7 );
    user.Materia0 = this.Nomemateria0;
    user.Materia1 = this.Nomemateria1;
    user.Materia2 = this.Nomemateria2;
    user.Materia3 = this.Nomemateria3;
    user.Materia4 = this.Nomemateria4;
    user.Materia5 = this.Nomemateria5;
    user.Materia6 = this.Nomemateria6;
    user.Materia7 = this.Nomemateria7;
       console.log('Salvar path materia =' + user.pathProfMateria0);
       this.userService.update(user);
  }


// delete formUser.password;
}
