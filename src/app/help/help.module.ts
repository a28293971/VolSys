import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HelpComponent } from './help.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';

const routes: Routes = [
  { path: '', component: HelpComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HelpComponent,
    DynamicFormQuestionComponent
  ]
})
export class HelpModule { }
