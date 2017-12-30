import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { NotifyService } from './core/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public auth: AuthService,
              public notify: NotifyService) { }
}
