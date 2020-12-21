import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public db: AngularFireDatabase,
    private router: Router) {

    console.log('Hello Auth Provider');
   }

 registerUser2(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          console.log('id do usuario' + userData.user.uid);
          resolve(userData.user); {}
        }).then(() => {
          this.loginEmailUser('admin@admin.com', '123456')
          .then((res) => {
            this.onLoginRedirect();
          });
        }).catch(err => console.log(reject(err)));

    });
  }
  onLoginRedirect(): void {
    this.router.navigate(['user/register']);
  }


  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    const userRef = this.db.object(`users/${user.uid}`);
    return userRef.set(user);
  }


  isUserAdmin(userUid) {
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }
  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afsAuth
        .authState
        .pipe()
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });
  }


}
