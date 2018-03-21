import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './activity/activity.component';
import { TableModule } from 'primeng/components/table/table';
import { DataTableModule } from 'primeng/components/datatable/datatable';

import { approveRoutes } from './approve.routes';

import { ApproveService } from './approve.service';
import { ActivityService } from './activity/activity.service';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    TableModule,
    RouterModule.forChild(approveRoutes),
  ],
  declarations: [
    ApproveComponent,
    ActivityComponent
  ],
  providers: [
    ApproveService,
    ActivityService
  ]
})
export class ApproveModule { }
