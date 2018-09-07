import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './public-activity/activity.component';
import { SelfAppliedComponent } from './self-applied/self-applied.component';

export const approveRoutes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ApproveComponent },
    { path: 'activity/:id', component: ActivityComponent },
    { path: 'self-applied-list', component: SelfAppliedComponent }
  ]
}];
