import { Key } from 'protractor';
import { Periodo } from './../models/conteudo/periodo.model';
import { Curso } from './../models/conteudo/curso.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/internal/operators/map';
import { ToastrService } from 'ngx-toastr';
import { Disciplina } from '../models/conteudo/disciplina.model';
import { Upload } from '../models/upload';
import { Path } from '../models/conteudo/path.model';
import { SetService } from './set.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  userRef: any;
  public currentUserUid: string;
  public currentCurso: string;
  path: Path;
  public pathList: string;
  public PathDisciplinas: any[] = [];




  constructor(  public fireDatabase: AngularFireDatabase,
    public angularFireAuth: AngularFireAuth,
    public setService: SetService,

    ) {
      this.currentUserUid = this.angularFireAuth.auth.currentUser.uid;
     }


   public selectedSubject(course: string, period: string, id: string): any {
    return this.fireDatabase.database.ref(`ListaDeCurso/${course}/${period}/${id}`).once('value');
  }


  public salvarDatabase(curso: Curso, periodo: Periodo, disciplina: Disciplina) {
    return new Promise((resolve, reject) => {

    this.fireDatabase.list(`ListaDeCurso/${curso}/${periodo}`).push({
      curso: curso,
      periodo: periodo,
      name: disciplina
    }
    ).then((data) => {
      console.log('key da disciplina' + data.key);
      resolve(data.ref); {}
            // this.toastr.success('Nova disciplina adicionada com sucesso', 'Ok', {
     //   timeOut: 3000
     // });
    }).catch(() => {
     // this.toastr.error('Erro ao adicionar disciplina', 'Ko', {
     //   timeOut: 3000
     // });
    });

  });
  }
  public salvarDatabase2( path: Path, uuid: string ) {
    this.fireDatabase.object(`PathDisciplinas/${uuid}`).set({
      key: uuid,
      curso: path.curso,
      periodo: path.periodo,
      materia: path.materia
    });
  }

  updatePath2( path: Path, curso: string, periodo: string, uuid: string ){
    const pathExcluir =  this.setService.getPathUpdate();
    this.deleteFileDataDisciplina(pathExcluir);
   return this.fireDatabase.object(`ListaDeCurso/${curso}/${periodo}/${uuid}`).update({
      key: uuid,
      curso: path.curso,
      periodo: path.periodo,
      name: path.materia
    });


  }

  updateDisciplina(curso: Path, periodo: Periodo, disciplina: Disciplina) {
    const path = this.setService.getPath();
    this.deleteFileDataDisciplina(curso);


  }
  salvar(curso: Curso, periodo: Periodo, disciplina: Disciplina){
    return this.updateDisciplina2(curso, periodo, disciplina);
  }

  updateDisciplina2(curso: Curso, periodo: Periodo, disciplina: Disciplina) {
    const path = this.setService.getPath();
    this.fireDatabase.object(`ListaDeCurso/${curso}/${periodo}/${path}`).update({
      curso: curso,
      periodo: periodo,
      name: disciplina
    });

    console.log(' teste update =' + path);
  }



  deleteFileDataDisciplina(name:  Path) {


    return this.fireDatabase.list(`ListaDeCurso/${name.curso}/${name.periodo}`).remove(name.$key);


  }

  updatePath( path: Path, uuid: string ){
    return this.fireDatabase.object(`PathDisciplinas/${uuid}`).update({
      key: uuid,
      curso: path.curso,
      periodo: path.periodo,
      materia: path.materia
    });

  }




  getAllAlunos() {
    console.log('teste seriço2');
    console.log(this.currentUserUid);
    return this.fireDatabase.list<Upload>(`Análise e desenvolvimento de sistemas/Primeiro/-Ls0H0FCWQDO8ifQTo-w/${this.currentUserUid}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  getAll() {
    console.log('teste seriço2');
    console.log(this.currentUserUid);
    return this.fireDatabase.list<Path>(`PathDisciplinas/`,
    ref => ref.orderByChild('curso'))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }


  deleteUpload(upload: Path) {
    console.log('delete' + upload.key);
    this.deleteFileData(upload).then(() =>{
      this.deleteFileData2();
      console.log('delete 2' + upload.key);
    } ).catch(error => console.log(error));


  }

  // Deletar detalhes do firebase realtime db
deleteFileData(name: Path) {

    return this.fireDatabase.list(`ListaDeCurso/${name.curso}/${name.periodo}`).remove(name.$key);

  }
 deleteFileData2() {
   const path = this.setService.getPath();

    return this.fireDatabase.object(`PathDisciplinas/${path}`).remove();

  }


}
