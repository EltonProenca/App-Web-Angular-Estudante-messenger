import { Component, OnInit } from '@angular/core';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExtraService } from 'src/app/services/extra.service';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  file;
  public fileForm: FormGroup;

  constructor(  private upSvc: UploadService,
      public  formBuilder: FormBuilder,
      public message: ExtraService



  ) {
    this.registerForm();
   }


  registerForm() {

      this.fileForm = this.formBuilder.group({
      comentario: ['']

    });

  }
  get Comentario() {
    return this.fileForm.get('comentario');
  }

  ngOnInit() {
    this.registerForm();
  }


  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

uploadSingle() {
  const formUser = this.fileForm.value;
  this.message.setUpload( formUser.comentario);
 console.log('teste enviar arquivo comentario = ' + formUser.comentario);
  console.log('teste enviar arquivo');
  const file = this.selectedFiles.item(0);
  this.currentUpload = new Upload(file);
  this.upSvc.pushUpload(this.currentUpload);
 // this.upSvc.saveFileData(this.fileForm.value);




}


/*
upload(event) {


  const file = event.target.files[0];
  const path = `pdf/${file.name}`;
  const fileRef = this.storage.ref(path.replace(/\s/g, ''));
  this.task = this.storage.upload(path.replace(/\s/g, ''), file);
  this.task.then(up => {
    fileRef.getDownloadURL().subscribe(url => {

      this.caminhoImagem = url;

    });
  });

}

saveProject() {

  this.currentUpload = this.fileForm.value
  this.currentUpload.url = this.caminhoImagem;

    this.projectService.save2(this.currentUpload )
      .then(() => {
      console.log(' salvo')
        // this.formProject.reset();

      })
      .catch((erro) => { });
  }
  */

}
