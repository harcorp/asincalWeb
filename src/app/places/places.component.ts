import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Places } from '../places';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { EditPlaceComponent } from '../edit-place/edit-place.component';
import { AddPlaceComponent } from '../add-place/add-place.component';
import { ConfirmDialogComponent } from '../core/confirm-dialog/confirm-dialog.component';
import { NotifyService } from '../core/notify.service';

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

  placesCollection: AngularFirestoreCollection<Places>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private afs: AngularFirestore,
              public dialog: MatDialog,
              private notify: NotifyService) { }

  ngAfterViewInit() {
    this.placesCollection = this.afs.collection<Places>('places');
    this.placesCollection.valueChanges().subscribe(actions => {
      this.dataSource = new MatTableDataSource(actions);
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

  addPlace(): void {
    const dialogRef = this.dialog.open(AddPlaceComponent, {
      width: '80%',
      height: 'auto',
    });
  }

  delete(uid: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar registro',
        body: '¿Esta seguro de eliminar?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notify.showLoader();
        this.afs.doc<Places>(`/places/${uid}`).delete().then(res => {
          this.notify.hideLoader();
          this.notify.show('Establecimiento eliminado correctamente', null);
        }).catch(e => {
          this.notify.hideLoader();
          this.notify.show('Error al eliminar el establecimiento.', null);
        });
      }
    });
  }

}
