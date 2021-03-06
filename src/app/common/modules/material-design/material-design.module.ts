import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule,
  MatDividerModule,
  MatExpansionModule,
  MatRadioModule,
  MatTooltipModule} from '@angular/material';
import {MatIconModule, MatInputModule, MatAutocompleteModule, MatSliderModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatRadioModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatGridListModule,
    MatDividerModule,
    MatExpansionModule,
    MatRadioModule,
    MatTooltipModule,
  ],
  providers: [
    MatDatepickerModule,
  ],
})
export class MaterialDesignModule { }
