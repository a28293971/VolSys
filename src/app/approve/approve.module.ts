import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './public-activity/activity.component';
import { SelfAppliedComponent } from './self-applied/self-applied.component';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { OverlayPanelModule } from 'primeng/components/overlaypanel/overlaypanel';

import { approveRoutes } from './approve.routes';

import { ApproveService } from './approve.service';
import { ActivityService } from './public-activity/activity.service';
import { SelfAppliedService } from './self-applied/self-applied.service';
import { ConfirmationService } from 'primeng/components/common/api';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    FormsModule,
    RouterModule.forChild(approveRoutes),
  ],
  declarations: [
    ApproveComponent,
    ActivityComponent,
    SelfAppliedComponent
  ],
  providers: [
    ApproveService,
    ActivityService,
    SelfAppliedService,
    ConfirmationService
  ]
})
export class ApproveModule { }
