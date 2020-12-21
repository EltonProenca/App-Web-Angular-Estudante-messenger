import { Disciplina } from './../../models/conteudo/disciplina.model';
import { Key } from 'protractor';
import { CursoService } from './../../servicesCurso/curso.service';
import { Periodo } from './../../models/conteudo/periodo.model';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Observable } from 'rxjs';
import { Upload } from 'src/app/models/upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/conteudo/curso.model';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Path } from 'src/app/models/conteudo/path.model';
import { SetService } from 'src/app/servicesCurso/set.service';


@Component({
  selector: 'app-add-conteudo',
  templateUrl: './add-conteudo.component.html',
  styleUrls: ['./add-conteudo.component.css']
})
export class AddConteudoComponent implements OnInit {
  public subjectForm: FormGroup;
  public idSubject: any;
  public disciplina: string = "Nova Disciplina";
  public course: string;
  public period: string;
  public id: string;
  public subjectEdit = {
    subjectName: ""
  }

  alunos: Observable<Upload[]>;
   paths: Observable<Path[]>;
   update: Path;
  edit: boolean;
  currentDisciplina: Disciplina;
  messages: string;
  Id: string;
  disciplinaPath: Path;


  constructor(
    public  databaseService: CursoService,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public pathService:  CursoService,
    public setService: SetService,
  //  public toastr: ToastrService,
   // public location: Location
  ) {

   }

   registerDisciplina(){
    this.subjectForm = this.formBuilder.group({
      curso: [''],
      periodo: ['', Validators.required],
      materia: ['', Validators.required],
    });

   }

  ngOnInit() {
    this.alunos = this.databaseService.getAllAlunos();
    this.paths =  this.pathService.getAll();
    this.registerDisciplina();


  }

  get Curso() {
    return this.subjectForm.get('curso');
  }
  get periodo() {
    return this.subjectForm.get('periodo');
  }
  get Materia() {
    return this.subjectForm.get('materia');
  }
  ResetForm() {
    this.subjectForm.reset();
  }


  // FIXME não está encontrando o input com nome course

  salvarDisciplina2() {
    let data = this.subjectForm.value;
    this.databaseService.salvarDatabase(data.curso, data.periodo, data.materia).then((data: firebase.database.Reference) => {
      const uuid: string = data.key;
      this.databaseService.salvarDatabase2(this.subjectForm.value, uuid);
    });
    /// .databaseService.setSubjectDataToDatabase2(this.subjectForm.value);

  }

  salvarDisciplina() {

    this.currentDisciplina = this.subjectForm.value;
    if (!this.edit) {

      let data = this.subjectForm.value;
    this.databaseService.salvarDatabase(data.curso, data.periodo, data.materia).then((data: firebase.database.Reference) => {
      const uuid: string = data.key;
      this.databaseService.salvarDatabase2(this.subjectForm.value, uuid);

    });

    } else {
      this.currentDisciplina = this.subjectForm.value;
      this.currentDisciplina.$key = this.id;


      let data = this.subjectForm.value;
       this.setService.setPath(this.currentDisciplina.$key);
       const uuid1: string =  this.currentDisciplina.$key;

      this.databaseService.updatePath2(this.subjectForm.value, data.curso, data.periodo, uuid1);
      const uuid: string =  this.currentDisciplina.$key;
      this.databaseService.updatePath(this.subjectForm.value, uuid)
      .catch((erro) => { this.messages = `Erro ao atualizar o projeto: ${erro}`} );


      this.subjectForm.reset();
    }
  }

 cancelar() {
    this.subjectForm.reset();
   // this.toastr.warning('Informações do formulário discartadas.', 'Cancelado', {
   //   timeOut: 3000
   // });
 }

  delete(disciplina: Path) {
    this.disciplinaPath = disciplina;
    this.Id = disciplina.key;
    this.setService.setPath(this.Id);
    this.databaseService.deleteUpload(disciplina);
  }
  editProject(p: Path) {
    this.update = p;
    this.setService.setPathUpdate(this.update);
    console.log('Nome disciplina  editada =' + this.update.materia);
    console.log('ID da disciplina  editada =' + this.update.key);
    this.edit = true;
    this.id = p.key;
    this.subjectForm.controls['curso'].setValue(p.curso);
    this.subjectForm.controls['periodo'].setValue(p.periodo);
     this.subjectForm.controls['materia'].setValue(p.materia);
    console.log('metodo edite = ' + p.materia + p.key );

  }


}
