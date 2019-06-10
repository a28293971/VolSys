import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './public-activity/activity.component';
import { SelfAppliedComponent } from './self-applied/self-applied.component';
import { OrgActivityComponent } from './org-activity/org-activity.component';

import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { ConfirmationService } from 'primeng/components/common/api';
import { MainPipe } from '../pipe/main-pipe.module';

import { approveRoutes } from './approve.routes';

import { ApproveService } from './approve.service';
import { ActivityService } from './public-activity/activity.service';
import { SelfAppliedService } from './self-applied/self-applied.service';
import { OrgActivityService } from './org-activity/org-activity.service';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ConfirmDialogModule,
    FormsModule,
    RouterModule.forChild(approveRoutes),
    MainPipe,
    TabViewModule
  ],
  declarations: [
    ApproveComponent,
    ActivityComponent,
    SelfAppliedComponent,
    OrgActivityComponent
  ],
  providers: [
    ApproveService,
    ActivityService,
    SelfAppliedService,
    OrgActivityService,
    ConfirmationService
  ]
})
export class ApproveModule { }
