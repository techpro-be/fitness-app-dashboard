import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'user-center'
  // },
  // {
  //   path: 'auth',
  //   loadChildren: 'src/app/modules/auth/auth.module#AuthModule',
  //   canActivate: [LoginGuard]
  // },
  // {
  //   path: 'user-center',
  //   loadChildren: 'src/app/modules/user/user.module#UserModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user-list'
  },
  {
    path: 'auth',
    loadChildren: 'src/app/modules/auth/auth.module#AuthModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'user',
    loadChildren: 'src/app/modules/user/user.module#UserModule',
    canActivate: [LoginGuard]
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
