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
      width: '350px',
      data: data
    });
  }

  trackByUid(index, item) {
    return item.uid;
  }

  addOne() {
    const user: User = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      mobile: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      uid: faker.random.alphaNumeric(16),
      roles: {
        afiliado: true,
      },
      photoURL: 'https://goo.gl/Fz9nrQ',
      address: faker.address.streetAddress(),
    };
    this.afs.collection('users').doc(user.uid).set(user);
  }

}
