import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {RosterComponent} from "./roster/roster.component";
import {RosterService} from "./roster/roster.service";
import {ScheduleService} from "./schedule/schedule.service";
import {ScheduleComponent} from "./schedule/schedule.component";
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ResultsComponent} from './results/results.component';
import {StandingsComponent} from './standings/standings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialComponentsModule} from "./material-components/material-components.module";
import {MatTableFilterModule} from "mat-table-filter";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {WeeklyResultsComponent} from './weekly-results/weekly-results.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioModule} from "@angular/material/radio";
import { TeamDetailComponent } from './team-detail/team-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResultsComponent,
    RosterComponent,
    ScheduleComponent,
    StandingsComponent,
    WeeklyResultsComponent,
    TeamDetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableFilterModule,
    MatToolbarModule,
    MaterialComponentsModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatRadioModule
  ],
  providers: [
    RosterService,
    ScheduleService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
