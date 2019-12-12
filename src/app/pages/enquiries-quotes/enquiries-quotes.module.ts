import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmEnquiryService } from './../../common/services/enquiries-quotes/confirm-enquiry.service';
import { QuotesComponent } from './quotes/quotes.component';
import { MastersModule } from './../masters/masters.module';
import { QuotesService } from './../../common/services/enquiries-quotes/quotes.service';
import { VehicleBodyService } from './../../common/services/masters/vehicle-body.service';
import { VehicleTypeService } from './../../common/services/masters/vehicle-type.service';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EnquiriesQuotesRoutingModule, routedComponents } from './enquiries-quotes-routing.module';
import { MaterialDesignModule } from '../../common/modules/material-design/material-design.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { EnquiriesService } from '../../common/services/enquiries-quotes/enquiries.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EnquiriesViewComponent } from './enquiries-view/enquiries-view.component';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { TransporterService } from '../../common/services/masters/transporter.service';
import { TransporterComponent } from '../masters/transporter/transporter.component';
import { EnquiryConfirmComponent } from './enquiry-confirm/enquiry-confirm.component';
import { EnquiriesReportComponent } from './enquiries-report/enquiries-report.component';
import { EnquiriesTableComponent } from './enquiries-table/enquiries-table.component';
import { NbCardModule, NbListModule, NbRadioModule } from '@nebular/theme';
import { PipesModule } from '../../common/modules/pipes/pipes.module';
import { EnquiryCardMobileComponent } from './enquiry-card-mobile/enquiry-card-mobile.component';
import { EnquiryCardDesktopComponent } from './enquiry-card-desktop/enquiry-card-desktop.component';

@NgModule({
  imports: [
    ThemeModule,
    EnquiriesQuotesRoutingModule,
    MaterialDesignModule,
    GooglePlaceModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyAdW-L7cDATNI2-G8kph-c8zKuDR8hTdzs',
    }),
    AgmDirectionModule,
    // Adding MastersModule as TransporterComponent
    // used in quotes page is part of another module
    MastersModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    PipesModule,
    NgbModule,
    NbRadioModule,
  ],
  declarations: [
    ...routedComponents,
    EnquiryConfirmComponent,
    EnquiriesReportComponent,
    EnquiryCardMobileComponent,
    EnquiryCardDesktopComponent,
  ],
  providers: [
    VehicleTypeService,
    VehicleBodyService,
    EnquiriesService,
    TransporterService,
    QuotesService,
    ConfirmEnquiryService,
    // Adding TransporterComponent used in quotes page
    // as Modal requires a new component instance to
    // be injected
    TransporterComponent,
    EnquiriesViewComponent,
  ],
  entryComponents: [
    TransporterComponent,
    QuotesComponent,
    EnquiryConfirmComponent,
    EnquiriesTableComponent,
    EnquiriesViewComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
  ],
})
export class EnquiriesQuotesModule { }
