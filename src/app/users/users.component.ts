import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { EditUserComponent } from '../edit-user/edit-user.component';

import * as faker from 'faker';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements AfterViewInit {

  displayedColumns = [
    'photoURL',
    'firstName',
    'lastName',
    'email',
    'place',
    'edit'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {
   }

  ngAfterViewInit() {
    this.afs.collection<any>('users').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });
  }

  trackByUid(index, item) {
    return item.uid;
  }

  addOne() {
    const user: User = {
      uid: faker.random.alphaNumeric(24),
      email: faker.internet.email(),
      photoURL: faker.image.imageUrl(400, 400),
      mobile: faker.phone.phoneNumber(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      active: true,
      place: faker.random.number({ min: 1, max: 10 }),
      docType: faker.random.number({ min: 1, max: 4}),
      docNumber: faker.random.number({ min: 1000000, max: 800000000}),
      observations: faker.random.words(10),
      city: faker.address.city(),
      roles: {
        afiliado: true,
      },
    };
    this.afs.collection('users').doc(user.uid).set(user, { merge: true });
  }

}
