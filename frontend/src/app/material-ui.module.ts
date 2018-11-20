// https://v6.material.angular.io/components/categories
import {MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatBadgeModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule, 
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatBadgeModule
    ],
  exports: [
      MatButtonModule, 
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule,
      MatTooltipModule,
      MatBadgeModule

    ]
})
export class MaterialUiModule { }