import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  private isAuthenticated: boolean;

  @Input()
  set isAuth(isAuth: boolean) {
    this.isAuthenticated = isAuth;
  }

  get isAuth(): boolean {
    return this.isAuthenticated;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
