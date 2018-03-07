import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { activitiesRoutes } from './activities.routes';
import { ActivitiesComponent } from './activities.component';

import { DataScrollerModule } from 'primeng/components/datascroller/datascroller';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { AccordionModule } from 'primeng/components/accordion/accordion';

import { ActivityService } from './activities.service';
import { ApplyActService } from './apply-act/apply-act.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { CreateActComponent } from './create-act/create-act.component';
import { CreateActService } from './create-act/create-act.service';
import { MainPipe } from '../pipe/main-pipe.module';
import { ApplyActComponent } from './apply-act/apply-act.component';


@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    DataScrollerModule,
    ConfirmDialogModule,
    RouterModule.forChild(activitiesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MainPipe
  ],
  declarations: [
    ActivitiesComponent,
    CreateActComponent,
    ApplyActComponent
  ],
  providers: [
    ActivityService,
    ConfirmationService,
    CreateActService,
    ApplyActService
  ]
})
export class ActivitiesModule { }
