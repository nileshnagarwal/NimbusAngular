import { LrEngageComponent } from './lr-engage/lr-engage.component';
import { AuthGuardService } from '../../common/services/auth/auth-guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';

const routes: Routes = [{
  path: '',
  component: LrEngageComponent,
  children: [{
    path: 'engage-lr',
    canActivate: [AuthGuardService],
    component: LrEngageComponent,
    }],
  }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule { }

export const routedComponents = [
    OperationsComponent,
    LrEngageComponent,
];
