import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';
import { Subscription } from 'rxjs/Subscription';
import { LoaderState } from './core/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  show = false;
  subscription: Subscription;

  constructor(public auth: AuthService,
              public notify: NotifyService) {
                this.subscription = this.notify.getLoader()
                .subscribe((state: LoaderState) => {
                  this.show = state.show;
                });
              }
}
