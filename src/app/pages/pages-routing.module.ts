import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'enquiries-quotes',
      loadChildren: () => import('./enquiries-quotes/enquiries-quotes.module')
        .then(m => m.EnquiriesQuotesModule),
    },
    {
      path: 'masters',
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
