import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigatorComponent} from "src/app/navigator/navigator.component";
import {PageRoutes} from "src/app/_constants/page-routes";
import {SummaryComponent} from "src/app/summary/summary.component";

const routes: Routes = [
  {
    path: PageRoutes.summary,
    component: SummaryComponent,
    title: 'Summary'
  },
  {
    path: `${PageRoutes.task}/:index/:task`,
    component: NavigatorComponent,
    title: route => `${route.params['index']}. ${route.params['task']} feladat`
  },
  {
    path: `${PageRoutes.task}/:index`,
    component: NavigatorComponent,
    title: route => `${route.params['index']}. feladat`
  },
  {
    path: PageRoutes.task,
    component: NavigatorComponent,
    title: 'Feladatok'
  },
  {
    path: '',
    redirectTo: PageRoutes.task,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
