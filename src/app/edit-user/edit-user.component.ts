import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  newEmail: string;

  constructor(private afs: AngularFirestore,
              private dialogRef: MatDialogRef<EditUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateEmail(): void {
    this.afs.collection('users').doc(this.data.uid).update({ email: this.newEmail });
    this.dialogRef.close();
  }
}
