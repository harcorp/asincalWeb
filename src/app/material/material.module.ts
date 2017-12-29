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
  MatGridListModule
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
    MatGridListModule
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
    MatGridListModule
  ],
  declarations: []
})
export class MaterialModule { }
