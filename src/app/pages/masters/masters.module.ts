import { AuthGuardService } from '../../common/services/auth/auth-guard/auth-guard.service';
import { TransporterService } from './../../common/services/masters/transporter.service';
import { VehicleBodyComponent } from './vehicle-body/vehicle-body.component';
import { VehicleTypeService } from './../../common/services/masters/vehicle-type.service';
import { TransporterViewComponent } from './transporter-view/transporter-view.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { MastersRoutingModule, routedComponents } from './masters-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VehicleBodyService } from './../../common/services/masters/vehicle-body.service';
import { MaterialDesignModule } from '../../common/modules/material-design/material-design.module';
import { NbCardModule } from '@nebular/theme';
import { CompanyHeaderComponent } from './company-header/company-header.component';

@NgModule({
  imports: [
    ThemeModule,
    MastersRoutingModule,
    Ng2SmartTableModule,
    MaterialDesignModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...routedComponents,
    VehicleBodyComponent,
    CompanyHeaderComponent,
  ],
  providers: [
    VehicleBodyService,
    VehicleTypeService,
    TransporterService,
    AuthGuardService,
  ],
  entryComponents: [
    TransporterViewComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    CompanyHeaderComponent,
  ],
})

export class MastersModule { }
