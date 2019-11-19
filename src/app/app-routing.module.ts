import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: LayoutComponent,
    loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },

  // {
  //   path: 'user',
  //   loadChildren: 'src/app/modules/user/user.module#UserModule',
  //   canActivate: [LoginGuard]
  // },
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
