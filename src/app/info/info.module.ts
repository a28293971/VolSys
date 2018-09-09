import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { MsgComponent } from './msg/msg.component';
import { InfoComponent } from './info.component';
import { infoRoutes } from './info.routes';
// import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { TabViewModule } from 'primeng/components/tabview/tabview';
import { DataListModule } from 'primeng/components/datalist/datalist';
import { DataScrollerModule } from 'primeng/components/datascroller/datascroller';
import { MainPipe } from '../pipe/main-pipe.module';

import { PersonalService } from './personal/personal.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { MsgService } from './msg/msg.service';




@NgModule({
  imports: [
    CommonModule,
    TabViewModule,
    DataListModule,
    MainPipe,
    // ConfirmDialogModule,
    DataScrollerModule,
    RouterModule.forChild(infoRoutes)
  ],
  declarations: [
    InfoComponent,
    PersonalComponent,
    MsgComponent
  ],
  providers: [
    PersonalService,
    MsgService
    // ConfirmationService
  ]
})
export class InfoModule { }
