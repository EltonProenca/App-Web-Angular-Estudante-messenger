import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Upload } from '../models/upload';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  public currentUserUid: string;
  upload: Upload;
  projectCol: AngularFirestoreCollection<Project>;
  uploadListRef: any;

  constructor(private afs: AngularFirestore,
    private db: AngularFireDatabase) {
      this.projectCol = afs.collection<Project>('projects')
  }

  getAllProjects(): Observable<Project[]> {
    return this.afs.collection<Project>('projects', ref =>
      ref.orderBy('datePub', 'desc'))
      .valueChanges()
  }

  save(project: Project): Promise<void> {
    project.datePub = new Date();
    return this.projectCol.add(Object.assign({}, project)).then(objeto => {
      project.idProject = objeto.id
      this.update(project)
    })
  }
  save2(upload: Upload): Promise<void> {
    // upload.datePub = new Date();
    this.uploadListRef = this.db.list<Upload>(`uploads/${this.currentUserUid}`);
    return this.uploadListRef.push(upload);

  }

  update(project: Project): Promise<void> {
    return this.projectCol.doc(project.idProject)
      .update(Object.assign({}, project))

  }
  update2(upload: Upload): Promise<void> {
    this.uploadListRef = this.db.list<Upload>(`uploads/${this.currentUserUid}`);
    return this.uploadListRef.push(upload);

  }

  delete(project: Project): Promise<void> {
    return this.projectCol.doc(project.idProject)
      .delete()
  }

}
