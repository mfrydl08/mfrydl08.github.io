import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public session = "Spring 2023";
  public sessions = [
    { id : '0', sessionName: 'Spring 2023'},
    { id : '1', sessionName: 'Summer 2023'},
    { id : '2', sessionName: 'Fall 2023'}
  ];

  public selectedSessionValue = '0';

  public getSession(id: string) {
    const x: number = +id;

    this.selectedSessionValue = id;
    this.session = this.sessions[x].sessionName;
  }

}
