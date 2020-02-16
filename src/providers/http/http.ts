import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionDataProvider } from '../session-data/session-data';
//import {UsernameProvider} from '../username/username';


@Injectable()
export class HttpProvider {

  public apiURL = 'http://localhost:3000/';
//  public username;
  private httpOptions = {
    'Content-Type':  'application/json',
    'Authorization': null
  };

  constructor(public http: HttpClient,public session: SessionDataProvider) {
  //   this.username=this.sessoin.getUsername();
     console.log('http constructor');
  }

  keepLoggedIn():any{
    console.log(this.session.getSessionData());
    this.httpOptions['Authorization'] = this.session.getSessionData();
    return this.http.post(this.apiURL+'initlogin',{},{headers: this.httpOptions});
  }

  login(username: string, password: string): any{
    return this.http.post(this.apiURL+'login', {
      username: username,
      password: password
    });
  }

  register(username:string,password:string,phone:string,email:string):any{
    return this.http.post(this.apiURL+'register',{
      username:username,
      password:password,
      phone:phone,
      email:email
    });
  }
  viewProfiles():any{
    return this.http.get(this.apiURL+'viewProfiles');
  }
  viewSurvey(custid:number):any{
    return this.http.get(this.apiURL+'viewSurvey/'+ custid);
  }
  submitSurvey(surveyresult:any){
    console.log('from http submit survey');
    console.log(surveyresult);
    return this.http.post(this.apiURL+'submitsurvey',{
      survey:surveyresult
    });
  }
  loggingout(username){
    return this.http.post(this.apiURL+'loggingout',{user:username});
  }


}
