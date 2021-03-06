import { QuoteCardComponent } from './quote-card/quote-card.component';
import { EnquiryViewComponent } from './enquiry-view/enquiry-view.component';
import { QuotesReportComponent } from './quotes-report/quotes-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { EnquiriesComponent } from './../enquiries-quotes/enquiries/enquiries.component';
import { EnquiriesTableComponent } from './enquiries-table/enquiries-table.component';
import { EnquiriesViewComponent } from './enquiries-view/enquiries-view.component';
import { EnquiriesQuotesComponent } from './enquiries-quotes.component';
import { EnquiriesSearchComponent } from './enquiries-search/enquiries-search.component';
import { EnquiriesReportComponent } from './enquiries-report/enquiries-report.component';
import { AuthGuardService } from '../../common/services/auth/auth-guard/auth-guard.service';
import { EnquiryListComponent } from './enquiry-list/enquiry-list.component';

const routes: Routes = [{
    path: '',
    component: EnquiriesComponent,
    children: [{
      path: 'enquiries',
      canActivate: [AuthGuardService],
      component: EnquiriesComponent,
      }],
  },
  {
    path: '',
    component: EnquiriesReportComponent,
    children: [{
      path: 'enquiries-report',
      canActivate: [AuthGuardService],
      component: EnquiriesReportComponent,
    }],
  },
  {
    path: '',
    component: QuotesReportComponent,
    children: [{
      path: 'quotes-report',
      canActivate: [AuthGuardService],
      component: QuotesReportComponent,
    }],
  },
  {
    path: '',
    component: EnquiryViewComponent,
    children: [{
      path: 'enquiry-view',
      canActivate: [AuthGuardService],
      component: EnquiryViewComponent,
    }],
  },
  {
    path: '',
    component: QuoteCardComponent,
    children: [{
      path: 'quote-card',
      canActivate: [AuthGuardService],
      component: QuoteCardComponent,
    }],
  },
  {
    path: '',
    component: EnquiriesSearchComponent,
    children: [{
      path: 'enquiries-search',
      canActivate: [AuthGuardService],
      component: EnquiriesSearchComponent,
    }],
  }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnquiriesQuotesRoutingModule { }

export const routedComponents = [
  EnquiriesQuotesComponent,
  EnquiriesComponent,
  QuotesComponent,
  EnquiriesTableComponent,
  EnquiriesViewComponent,
  QuotesReportComponent,
  EnquiriesSearchComponent,
  EnquiryListComponent,
  QuoteCardComponent,
];
