import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { LoaderState } from './loader';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotifyService {

  private loaderSubject = new Subject<LoaderState>();

  constructor(public snackBar: MatSnackBar) {
    console.log('cargooo');
   }

  show(content: string, action: string) {
    this.snackBar.open(content, action, {
      duration: 3000
    });
  }

  showLoader() {
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  hideLoader() {
    this.loaderSubject.next(<LoaderState>{show: false});
  }

  getLoader(): Observable<LoaderState> {
    return this.loaderSubject.asObservable();
  }
}
