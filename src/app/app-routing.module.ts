// // Roadkill version
// import {NgModule} from "@angular/core";
// import {RouterModule, Routes} from "@angular/router";
// import {RosterComponent} from "./roster/roster.component";
// import {ScheduleComponent} from "./schedule/schedule.component";
// import {HomeComponent} from "./home/home.component";
// import {ResultsComponent} from "./results/results.component";
// import {StandingsComponent} from "./standings/standings.component";
// import {TeamDetailComponent} from "./team-detail/team-detail.component";
//
// const routes: Routes = [
//   {path: '', redirectTo: '/home', pathMatch: "full" },
//   {path: 'home', component: HomeComponent},
//   {path: 'roster', component: RosterComponent},
//   {path: 'schedule', component: ScheduleComponent},
//   {path: 'results', component: ResultsComponent},
//   {path: 'standings', component: StandingsComponent},
//   {path: 'detail/:id', component: TeamDetailComponent},
//   { path: '**', redirectTo: '/home', pathMatch: 'full' },
// ];
//
// @NgModule({
//   declarations: [],
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


// All teams version
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RosterComponent} from "./roster/roster.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {HomeComponent} from "./home/home.component";
import {ResultsComponent} from "./results/results.component";
import {StandingsComponent} from "./standings/standings.component";
import {TeamDetailComponent} from "./team-detail/team-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: "full" },
  {path: 'home', component: HomeComponent},
  {path: 'roster/:id', component: RosterComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'standings', component: StandingsComponent},
  {path: 'detail/:id', component: TeamDetailComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
