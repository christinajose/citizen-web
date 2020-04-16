import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { WheelComponent } from './pages/wheel/wheel.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { SelectionComponent } from './pages/selection/selection.component';
import { BoundingComponent } from './pages/bounding/bounding.component';


const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'select-feature', component: WheelComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'levelone', component: SelectionComponent },
  { path: 'leveltwo', component: BoundingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
