import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatSortModule,
  MatDialogModule,
  MatPaginatorModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatSidenavModule
} from '@angular/material';
import { SideNavMenuModule } from 'mat-sidenav-menu';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    SideNavMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatProgressBarModule,
    SideNavMenuModule
  ],
  declarations: []
})
export class MaterialModule { }
