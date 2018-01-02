import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Places } from '../places';

@Pipe({
  name: 'placeName'
})
export class PlaceNamePipe implements PipeTransform {

  constructor(private afs: AngularFirestore) {

  }

  transform(value: any, args?: any): any {
    if (value === undefined) {
      return null;
    }
    return new Promise(resolve => {
      this.afs.doc<Places>(`places/${value}`).valueChanges().subscribe(val => {
        resolve(val['name']);
     });
    });
  }

}
