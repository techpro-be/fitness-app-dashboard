import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  // {
  //   path: 'user',
  //   component: LayoutComponent,
  //   loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule),
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user/user-list'
  },
  {
    path: 'user',
    loadChildren: 'src/app/modules/user/user.module#UserModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
