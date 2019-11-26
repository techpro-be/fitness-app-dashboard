import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'user',
    loadChildren: 'src/app/modules/user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
