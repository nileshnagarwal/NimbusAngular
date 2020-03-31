import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from '../common/services/auth/auth-guard/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'enquiries-quotes',
      canActivate: [AuthGuardService],
      loadChildren: () => import('./enquiries-quotes/enquiries-quotes.module')
        .then(m => m.EnquiriesQuotesModule),
    },
    {
      path: 'operations',
      canActivate: [AuthGuardService],
      loadChildren: () => import('./operations/operations.module')
        .then(m => m.OperationsModule),
    },
    {
      path: 'masters',
      canActivate: [AuthGuardService],
      loadChildren: () => import('./masters/masters.module')
        .then(m => m.MastersModule),
    },
    {
      path: '',
      redirectTo: 'enquiries-quotes',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
