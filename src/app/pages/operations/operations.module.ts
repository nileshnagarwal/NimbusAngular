import { MaterialDesignModule } from './../../common/modules/material-design/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { routedComponents, OperationsRoutingModule } from './operations-routing.module';
import { NbCardModule } from '@nebular/theme';
import { LrGenerateComponent } from './lr-generate/lr-generate.component';




@NgModule({
  declarations: [...routedComponents, LrGenerateComponent],
  imports: [
    ThemeModule,
    OperationsRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    MaterialDesignModule,
  ],
})
export class OperationsModule { }
