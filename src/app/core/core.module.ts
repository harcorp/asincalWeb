import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';
import { PlaceNamePipe } from './place-name.pipe';
import { DocTypePipe } from './doc-type.pipe';
import { MaterialModule } from '../material/material.module';
import { AdminNamePipe } from './admin-name.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  providers: [ AuthService, NotifyService ],
  declarations: [ PlaceNamePipe, DocTypePipe, AdminNamePipe, ConfirmDialogComponent ],
  exports: [ PlaceNamePipe, DocTypePipe, AdminNamePipe ],
  entryComponents: [ConfirmDialogComponent]
})
export class CoreModule { }
