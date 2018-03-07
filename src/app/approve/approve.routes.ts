import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './activity/activity.component';

export const approveRoutes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ApproveComponent },
    { path: 'activity/:id', component: ActivityComponent }
  ]
}];
