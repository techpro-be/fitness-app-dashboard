import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/components/dashboard/dashboard.component';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
