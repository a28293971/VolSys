import { WorkspaceComponent } from './workspace.component';
import { WelcomeComponent } from '../welcome/welcome.component';

export const workspaceRoutes = [
    {
        path: '',
        component: WorkspaceComponent,
        children: [
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'welcome', component: WelcomeComponent },
            { path: 'act', loadChildren: '../activities/activities.module#ActivitiesModule' },
            { path: 'info', loadChildren: '../info/info.module#InfoModule' },
            { path: 'apr', loadChildren: '../approve/approve.module#ApproveModule' }
        ]
    }
];
