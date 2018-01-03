import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { User } from '../user';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService {

  user: Observable<User>;
  private usersURL = 'http://localhost:6969/api/users';

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService,
              private http: Http) {

          this.user = this.afAuth.authState
                  .switchMap(user => {
                    if (user) {
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                    } else {
                      return Observable.of(null);
                    }
                  });
               }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.setUserDoc(user);
        this.router.navigate(['/']);
      })
      .catch(error => this.handleError (error));
  }

  createUser(newUser: User): Promise<void> {
    return this.http.post(this.usersURL, newUser)
                 .toPromise()
                 .then(response => response.json())
                 .catch(e => {
                    console.log(e.json().error);
                    this.handleError(e);
                  });
  }
    private showLoader(): void {
      this.notify.showLoader();
  }
  createUserFinal(newUser: User) {
    this.showLoader();
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.usersURL, newUser)
        .toPromise()
        .then(res => {
          resolve();
        })
        .catch(e => {
           this.handleError(e);
           this.notify.hideLoader();
         });
    });

    return promise;
  }

  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      photoURL: 'https://goo.gl/Fz9nrQ',
      roles: {
        afiliado: true
      }
    };

    return userRef.set(data);

  }

  private handleError(error) {
    switch (error.json().error) {
      case 'auth/invalid-email':
        error = 'Ingrese un correo valido';
        break;
      case 'auth/phone-number-already-exists':
        error = 'El numero de telefono que ingreso ya esta registrado';
        break;
      case 'auth/email-already-exists':
        error = 'El correo electronico que ingreso ya esta registrado';
        break;
      default:
        error = 'Error inesperado';
        break;
    }
    this.notify.show(error, null);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/login']);
    });
  }
}
