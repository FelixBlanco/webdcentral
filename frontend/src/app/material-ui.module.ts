// https://v6.material.angular.io/components/categories
import {MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule, MatProgressBarModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      MatButtonModule, 
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule
    ],
  exports: [
      MatButtonModule, 
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatInputModule
    ]
})
export class MaterialUiModule { }