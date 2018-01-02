import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Places } from '../places';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { EditPlaceComponent } from '../edit-place/edit-place.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements AfterViewInit {

  displayedColumns = [
    'name',
    'city',
    'address',
    'edit'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private afs: AngularFirestore,
              public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.afs.collection<any>('places').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(EditPlaceComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });
  }

  trackByUid(index, item) {
    return item.uid;
  }

}
