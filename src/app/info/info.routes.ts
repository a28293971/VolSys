import { InfoComponent } from './info.component';
import { PersonalComponent } from './personal/personal.component';
import { MsgComponent } from './msg/msg.component';

export const infoRoutes = [
    {
        path: '',
        component: InfoComponent,
        children: [
            { path: '', redirectTo: 'personal', pathMatch: 'full' },
            { path: 'personal', component: PersonalComponent },
            { path: 'msg', component: MsgComponent },
            { path: 'change-password', loadChildren: './change-pwd/change-pwd.module#ChangePwdModule' }
        ]
    }
];
