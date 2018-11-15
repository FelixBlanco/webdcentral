// https://v6.material.angular.io/components/categories
import {MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTooltipModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule, 
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule
    ],
  exports: [
      MatButtonModule, 
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule
    ]
})
export class MaterialUiModule { }