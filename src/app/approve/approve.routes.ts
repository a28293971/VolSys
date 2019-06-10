import { ApproveComponent } from './approve.component';
import { ActivityComponent } from './public-activity/activity.component';
import { SelfAppliedComponent } from './self-applied/self-applied.component';
import { OrgActivityComponent } from './org-activity/org-activity.component';


export const approveRoutes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ApproveComponent },
    { path: 'activity/:id', component: ActivityComponent },
    { path: 'self-applied-list', component: SelfAppliedComponent },
    { path: 'org-activity', component: OrgActivityComponent }
  ]
}];
