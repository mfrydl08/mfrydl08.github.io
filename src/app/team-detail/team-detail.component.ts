import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {StandingsService} from "../standings/standings.service";

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  public teamName = "";

  constructor(private location: Location,
              private route: ActivatedRoute,
              public standingsService: StandingsService) {
  }

  public ngOnInit() {
    const id = parseInt(<string>this.route.snapshot.paramMap.get('id'), 10);

    this.teamName = this.standingsService.getTeamNameById(id);
  }

  public goBack(): void {
    this.location.back();
  }
}
