import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChangePwdComponent } from './change-pwd.component';

import { ChangePwdService } from './change-pwd.service';

const routes: Routes = [
  { path: '', component: ChangePwdComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChangePwdComponent
  ],
  providers: [
    ChangePwdService
  ]
})
export class ChangePwdModule { }
