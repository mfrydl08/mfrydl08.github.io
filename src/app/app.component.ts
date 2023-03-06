import {Component, ViewChild} from '@angular/core';
import {faBars, faHome} from "@fortawesome/free-solid-svg-icons";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isExpanded = true;
  isShowing = false;
  homeIcon = faHome;
  menuIcon = faBars;
  title = 'Roadkill';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
