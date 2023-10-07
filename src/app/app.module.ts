import {APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatRadioModule} from "@angular/material/radio";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableFilterModule} from "mat-table-filter";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MaterialComponentsModule} from "./material-components/material-components.module";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ResultsComponent} from './results/results.component';
import {RosterComponent} from "./roster/roster.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ScheduleService} from "./schedule/schedule.service";
import {StandingsComponent} from './standings/standings.component';
import {TeamDetailComponent} from './team-detail/team-detail.component';
import {WeeklyResultsComponent} from './weekly-results/weekly-results.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResultsComponent,
    RosterComponent,
    ScheduleComponent,
    StandingsComponent,
    TeamDetailComponent,
    WeeklyResultsComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableFilterModule,
        MatTableModule,
        MatToolbarModule,
        MaterialComponentsModule,
        ReactiveFormsModule
    ],
  providers: [
    ScheduleService,
    WeeklyResultsComponent,
    {provide: APP_BASE_HREF, useValue : '/' },
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
