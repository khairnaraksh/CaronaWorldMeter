import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ReportsComponent } from './component/reports/reports.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'Dashboard',
    component: DashboardComponent
  }, {
    path: 'Reports',
    component: ReportsComponent
    // loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
