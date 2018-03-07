import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'workspace',
        // canActivate: [ActAuthGuard],
        canLoad: [AuthGuard],
        loadChildren: './workspace/workspace.module#WorkspaceModule'
    },
    {
        path: '**', // fallback router must in the last
        component: LoginComponent
    }
];
