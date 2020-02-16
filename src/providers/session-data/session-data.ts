import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionDataProvider {

  public username:BehaviorSubject<string> = new BehaviorSubject<string>('');
  //public first_name:BehaviorSubject<string> = new BehaviorSubject<string>('');
  //public last_name:BehaviorSubject<string> = new BehaviorSubject<string>('');
  public token:BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {

  }

  setSessionData(data){
    this.username.next(data.username);
  //  this.first_name.next(data.first_name);
  //  this.last_name.next(data.last_name);
    this.token.next(data.token);
    localStorage.setItem('token', data.token);
  }
 getSessionData(){
   console.log("Session", localStorage.getItem('token'));
   return localStorage.getItem('token');
 }
  /*getFirstName(){
    return this.first_name.value;
  }*/

  /*getLastName(){
    return this.last_name.value;
  }*/

  getUsername(){
    return this.username.value;
  }

  deleteToken(){
   console.log("entered deletetoken fnc in sessionprovider");
   return localStorage.removeItem('token');
  }
}
