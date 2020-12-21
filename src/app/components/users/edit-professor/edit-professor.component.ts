import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/servicesCurso/curso.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from 'src/app/models/user.model';
import { SetService } from 'src/app/servicesCurso/set.service';
import { Path } from 'src/app/models/conteudo/path.model';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {
  public signupForm: FormGroup;
  usuarios: Observable<User[]>;
  paths: Observable<Path[]>;
  currentUser: User;
  canEdit: boolean = false;
  user: User;
  id: string;
  pathUser: any;
  messages: string; Nomemateria0: string;
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


  constructor(public authService: AuthService,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public pathService:  CursoService,
    public setService: SetService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm();            // Call student form when component is ready
    this.usuarios =  this.userService.getAllProfessor();
    this.paths =  this.pathService.getAll();
    this.carregarDados(this.user);
  }
  registerForm() {

      this.signupForm = this.formBuilder.group({
      usuario: ['aluno'],
      name: ['', [Validators.required, Validators.minLength(3)]],
      ra: ['', [Validators.required, Validators.minLength(3)]],
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
      pathMateria0: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria1: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria2: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria3: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria4: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria5: ['', [Validators.required, Validators.minLength(3)]],
      pathMateria6: ['', [Validators.required, Validators.minLength(3)]],
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
  get Ra() {
    return this.signupForm.get('ra');
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


  salvarProfessor() {
    this.currentUser = this.signupForm.value;
      this.currentUser.key = this.id;
      console.log('Salvar edit Aluno=' + this.currentUser.name);
      this.userService.update(this.currentUser)
      .then(() => {
        this.salvarPathmateria(this.currentUser);
        this.messages = `Projeto Atulizado com sucesso!`;
        this.signupForm.reset();
      })
      .catch((erro) => { this.messages = `Erro ao atualizar o projeto: ${erro}`});
      setTimeout(() => {
        this.router.navigate([ 'user/register']);
      });



  }
  carregarDados(p: User) {
    p = this.setService.getUser();

    this.user = p;

    console.log('teste update no edit =' + p.name);
    this.id = p.key;
     this.signupForm.controls['usuario'].setValue(p.usuario);
     this.signupForm.controls['name'].setValue(p.name);
     this.signupForm.controls['ra'].setValue(p.ra);
     this.signupForm.controls['Curso0'].setValue(p.Curso0);
     this.signupForm.controls['Curso1'].setValue(p.Curso1);
     this.signupForm.controls['Curso2'].setValue(p.Curso2);
     this.signupForm.controls['Curso3'].setValue(p.Curso3);
     this.signupForm.controls['Curso4'].setValue(p.Curso4);
     this.signupForm.controls['Curso5'].setValue(p.Curso5);
     this.signupForm.controls['Curso6'].setValue(p.Curso6);
     this.signupForm.controls['Curso7'].setValue(p.Curso7);
     this.signupForm.controls['Periodo0'].setValue(p.Periodo0);
     this.signupForm.controls['Periodo1'].setValue(p.Periodo1);
     this.signupForm.controls['Periodo2'].setValue(p.Periodo2);
     this.signupForm.controls['Periodo3'].setValue(p.Periodo3);
     this.signupForm.controls['Periodo4'].setValue(p.Periodo4);
     this.signupForm.controls['Periodo5'].setValue(p.Periodo5);
     this.signupForm.controls['Periodo6'].setValue(p.Periodo6);
     this.signupForm.controls['Periodo7'].setValue(p.Periodo7);
     this.signupForm.controls['Materia0'].setValue(p.Materia0);
     this.signupForm.controls['Materia1'].setValue(p.Materia1);
     this.signupForm.controls['Materia2'].setValue(p.Materia2);
     this.signupForm.controls['Materia3'].setValue(p.Materia3);
     this.signupForm.controls['Materia4'].setValue(p.Materia4);
     this.signupForm.controls['Materia5'].setValue(p.Materia5);
     this.signupForm.controls['Materia6'].setValue(p.Materia6);
     this.signupForm.controls['Materia7'].setValue(p.Materia7);
     this.signupForm.controls['pathMateria0'].setValue(p.pathMateria0);
     this.signupForm.controls['pathMateria1'].setValue(p.pathMateria1);
     this.signupForm.controls['pathMateria2'].setValue(p.pathMateria2);
     this.signupForm.controls['pathMateria3'].setValue(p.pathMateria3);
     this.signupForm.controls['pathMateria4'].setValue(p.pathMateria4);
     this.signupForm.controls['pathMateria5'].setValue(p.pathMateria5);
     this.signupForm.controls['pathMateria6'].setValue(p.pathMateria6);
     this.signupForm.controls['pathMateria7'].setValue(p.pathMateria7);
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
      user.pathProfMateria0 = user.key;
      user.pathProfMateria1 = user.key;
      user.pathProfMateria2 = user.key;
      user.pathProfMateria3 = user.key;
      user.pathProfMateria4 = user.key;
      user.pathProfMateria5 = user.key;
      user.pathProfMateria6 = user.key;
      user.pathProfMateria7 = user.key;
         console.log('Salvar path materia =' + user.pathProfMateria0);
         this.userService.update(user);
     }
}
