import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './activity/activity.component';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';

import { approveRoutes } from './approve.routes';

import { ApproveService } from './approve.service';
import { ActivityService } from './activity/activity.service';
import { ConfirmationService } from 'primeng/components/common/api';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ConfirmDialogModule,
    FormsModule,
    RouterModule.forChild(approveRoutes),
  ],
  declarations: [
    ApproveComponent,
    ActivityComponent
  ],
  providers: [
    ApproveService,
    ActivityService,
    ConfirmationService
  ]
})
export class ApproveModule { }
