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
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
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
    MatProgressSpinnerModule
  ],
  exports: [
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
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
