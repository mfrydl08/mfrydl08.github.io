import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public sessions = [
    { id : '0', sessionName: 'Spring 2023'},
    { id : '1', sessionName: 'Summer 2023'},
    { id : '2', sessionName: 'Fall 2023'},
    { id : '3', sessionName: 'Spring 2024'},
    { id : '4', sessionName: 'Summer 2024'},
    { id : '5', sessionName: 'Fall 2024'}
  ];

  public session = this.sessions[3].sessionName;

  public selectedSessionValue = '3';
  // public selectedDivisionValue = '1';
  public defaultDivisionValue = '1';

  public setSelectedSession() {
    const x: number = +this.selectedSessionValue;

    this.session = this.sessions[x].sessionName;
  }
}
