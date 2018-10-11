import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserRecordsComponent } from './user-records.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/components/table/table';

import { UserRecordsService } from './user-records.service';


const routes: Routes = [
  { path: '', component: UserRecordsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UserRecordsComponent
  ],
  providers: [
    UserRecordsService
  ]
})
export class UserRecordsModule { }
