
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
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

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
