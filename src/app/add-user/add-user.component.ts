import { Component } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmailValidator } from '../core/emailValidator';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Places } from '../places';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifyService } from '../core/notify.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  private itemsCollection: AngularFirestoreCollection<Places>;
  places: Observable<Places[]>;
  user: User = null;
  addForm: any;
  submited = false;
  docType = [
    'Cedula de Ciudadania',
    'Cedula de extrangeria',
    'Pasaporte',
    'Otro'
  ];

  roles = [
    'Super Administrador',
    'Administrador',
    'Afiliado'
  ];

  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private auth: AuthService,
              private dialogRef: MatDialogRef<AddUserComponent>,
              private notify: NotifyService) {

    this.itemsCollection = afs.collection<Places>('places');
    this.places = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Places;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.addForm = this.fb.group({
      'firstName' : ['', Validators.compose([Validators.required])],
      'password' : ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'lastName' : ['', Validators.compose([Validators.required])],
      'docType' : ['', Validators.compose([Validators.required])],
      'docNumber' : ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      'address' : ['', Validators.compose([Validators.required])],
      'city' : ['', Validators.compose([Validators.required])],
      'role' : ['', Validators.compose([Validators.required])],
      'place' : ['', Validators.compose([Validators.required])],
      'state' : ['', Validators.compose([Validators.required])],
      'observations' : ['', Validators.compose([Validators.maxLength(255)])],
      'mobile' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$')
      ])],
      'email' : ['', Validators.compose([EmailValidator.isValid, Validators.required])]
    });
  }

  submit() {
    this.user = this.addForm.value;
    this.auth.createUserFinal(this.user).then(resolve => {
      console.log(resolve, 'entro');
      this.notify.show('Usuario creado correctamente', null);
      this.notify.hideLoader();
      this.dialogRef.close();
    });
  }

}
