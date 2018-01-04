import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { Places } from '../places';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { FormGroupDirective, NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotifyService } from '../core/notify.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  place: Places = null;
  addForm: any;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private dialogRef: MatDialogRef<AddPlaceComponent>,
              private notify: NotifyService) {
                this.usersCollection = afs.collection<User>('users', ref => ref.where('role', '==', 1));
                this.users = this.usersCollection.snapshotChanges().map(actions => {
                  return actions.map(a => {
                    const data = a.payload.doc.data() as User;
                    const id = a.payload.doc.id;
                    return { id, ...data};
                  });
                });

                this.addForm = this.fb.group({
                  'name' : ['', Validators.compose([Validators.required])],
                  'address' : ['', Validators.compose([Validators.required])],
                  'adminUid' : ['', Validators.compose([Validators.required])],
                  'city' : ['', Validators.compose([Validators.required])],
                  'state' : ['', Validators.compose([Validators.required])],
                  'phone' : ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(7),
                    Validators.maxLength(10)
                  ])],
                });
              }

  submit() {
    this.place = this.addForm.value;
    this.place.active = true;
    this.notify.showLoader();
    this.place.uid = this.afs.createId();
    this.afs.doc<Places>(`/places/${this.place.uid}`).set(this.place).then(res => {
      this.notify.hideLoader();
      this.notify.show('Establecimiento correctamente creado', null);
      this.dialogRef.close();
    }).catch(e => {
      this.notify.hideLoader();
      this.notify.show('Error: ' + e, null);
    });
  }

}
