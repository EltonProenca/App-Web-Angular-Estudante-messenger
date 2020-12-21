import { Path } from 'src/app/models/conteudo/path.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { SetService } from 'src/app/servicesCurso/set.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;
  Path: any;

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public userService: UserService,
    public setSerice: SetService
  ) { }

  ngOnInit() {
    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((user: User) => {
        this.currentUser = user;

      });

  }


  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.Path = this.setSerice.setPath(this.currentUser.pathMateria0);
    console.log('path' + this.Path);

    if (this.filePhoto) {

      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {


        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.cd.detectChanges();

      }, (error: Error) => {
        // catch error
      });

       uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        this.editUser(downloadURL);
       console.log('URL:' + downloadURL);
      });

    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {
     this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        ra: this.currentUser.ra,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
        this.cd.detectChanges();
      });
  }

}

