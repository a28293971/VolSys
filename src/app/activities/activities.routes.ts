import { ActivitiesComponent } from './activities.component';
import { CreateActComponent } from './create-act/create-act.component';
/* import { ApplyActComponent } from './apply-act/apply-act.component'; */

export const activitiesRoutes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'activities', pathMatch: 'full' },
    { path: 'activities', component: ActivitiesComponent },
    { path: 'createact', component: CreateActComponent}/* ,
    { path: 'apllyact', component: ApplyActComponent} */
  ]
}];
