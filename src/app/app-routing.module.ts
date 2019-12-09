import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'auth',
    loadChildren: 'src/app/modules/auth/auth.module#AuthModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'users',
    component: LayoutComponent,
    loadChildren: 'src/app/modules/user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard]
})
export class AppRoutingModule { }
