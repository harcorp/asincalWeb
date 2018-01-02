import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Places } from '../places';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.sass']
})
export class EditPlaceComponent {

  place: Places;

  constructor(private afs: AngularFirestore,
              private dialogRef: MatDialogRef<EditPlaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.place = this.data;
               }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
