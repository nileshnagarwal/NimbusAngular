import { LrReportComponent } from './lr-report/lr-report.component';
import { LrViewComponent } from './lr-view/lr-view.component';
import { LrGenerateComponent } from './lr-generate/lr-generate.component';
import { LrEngageComponent } from './lr-engage/lr-engage.component';
import { AuthGuardService } from '../../common/services/auth/auth-guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';

const routes: Routes = [
  {
    path: '',
    component: LrEngageComponent,
    children: [{
      path: 'engage-lr',
      canActivate: [AuthGuardService],
      component: LrEngageComponent,
      }],
  },
  {
    path: '',
    component: LrGenerateComponent,
    children: [{
      path: 'generate-lr',
      canActivate: [AuthGuardService],
      component: LrGenerateComponent,
      }],
  },
  {
    path: '',
    component: LrReportComponent,
    children: [{
      path: 'lr-report',
      canActivate: [AuthGuardService],
      component: LrReportComponent,
      }],
  },  
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule { }

export const routedComponents = [
    OperationsComponent,
    LrEngageComponent,
    LrGenerateComponent,
    LrReportComponent,
    LrViewComponent,
];
