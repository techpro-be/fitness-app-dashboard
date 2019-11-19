import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'work4eudashboard';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
}
