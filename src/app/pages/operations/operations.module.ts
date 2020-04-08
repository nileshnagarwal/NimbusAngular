import { MaterialDesignModule } from './../../common/modules/material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { routedComponents, OperationsRoutingModule } from './operations-routing.module';
import { NbCardModule } from '@nebular/theme';
import { LrEngageComponent } from './lr-engage/lr-engage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LrViewComponent } from './lr-view/lr-view.component';



@NgModule({
  declarations: [...routedComponents, LrViewComponent],
  imports: [
    ThemeModule,
    OperationsRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    MaterialDesignModule,
    NgbModule,
  ],
  entryComponents: [
    LrEngageComponent,
  ]
})
export class OperationsModule { }
