import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../user';

@Pipe({
  name: 'adminName'
})
export class AdminNamePipe implements PipeTransform {

  constructor(private afs: AngularFirestore) { }
  transform(value: any, args?: any): any {
    if (value === undefined) {
      return null;
    }
    return new Promise(resolve => {
      this.afs.doc<User>(`users/${value}`).valueChanges().subscribe(val => {
        resolve(val['firstName'] + ' ' + val['lastName']);
      });
    });
  }

}
