import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeetInchesPipe } from './feet-inches.pipe';

@NgModule({
  declarations: [FeetInchesPipe],
  imports: [
    CommonModule,
  ],
  exports: [CommonModule, FeetInchesPipe],
})
export class PipesModule { }
