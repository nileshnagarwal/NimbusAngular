import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MaterialDesignModule } from './../../common/modules/material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { routedComponents, OperationsRoutingModule } from './operations-routing.module';
import { NbCardModule } from '@nebular/theme';
import { LrEngageComponent } from './lr-engage/lr-engage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MastersModule } from './../masters/masters.module';
import { CompanyHeaderComponent } from '../masters/company-header/company-header.component';
import { NgxPrintModule } from 'ngx-print';
import { LrViewComponent } from './lr-view/lr-view.component';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    ThemeModule,
    OperationsRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    MaterialDesignModule,
    NgbModule,
    MastersModule,
    NgxPrintModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    LrEngageComponent,
    CompanyHeaderComponent,
    LrViewComponent,
  ],
})
export class OperationsModule { }
