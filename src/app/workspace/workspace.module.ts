import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'primeng/components/chart/chart';

import { LeftNavComponent } from '../left-nav/left-nav.component';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { FooterInfoComponent } from '../footer-info/footer-info.component';
import { WorkspaceComponent } from './workspace.component';
import { WelcomeComponent } from '../welcome/welcome.component';

import { EventBusService } from '../common/services/event-bus.service';
import { AppSideMenuComponent } from '../left-nav/app-side-menu/app-side-menu.component';
import { workspaceRoutes } from './workspace.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(workspaceRoutes),
        ChartModule
    ],
    exports: [],
    declarations: [
        WorkspaceComponent,
        LeftNavComponent,
        TopMenuComponent,
        FooterInfoComponent,
        AppSideMenuComponent,
        WelcomeComponent
    ],
    providers: [EventBusService]
})
export class WorkspaceModule { }
