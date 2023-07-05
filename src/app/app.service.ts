import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public session = "Summer 2023";
  public sessions = [
    { id : '0', sessionName: 'Spring 2023'},
    { id : '1', sessionName: 'Summer 2023'},
    { id : '2', sessionName: 'Fall 2023'}
  ];

  public selectedSessionValue = '1';

  public setSelectedSession() {
    const x: number = +this.selectedSessionValue;

    this.session = this.sessions[x].sessionName;
  }
}
