import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SessionDataProvider } from '../../providers/session-data/session-data';
import {HomePage} from '../home/home';//this has to be added if setroot has to work
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public admin;
  public resultdata;
  public value;
  public surveyresult;
  //public enqidarr:number[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider, public session: SessionDataProvider) {
    this.admin=this.navParams.data.adm;
    this.value='requested';
    this.getProfiles();
  }

  getProfiles(){
    this.http.viewProfiles().subscribe(
      (res)=>{
        this.resultdata = res;
      }
    );
  }
  viewSurveyForm(custid:number){

    console.log(custid);
    this.http.viewSurvey(custid).subscribe(
      (res)=>{
        this.surveyresult=res;
      /*  for(let i in res.length){
          this.enqidarr.push(res.enquiry_id);
        } */
        console.log(this.surveyresult);
       this.navCtrl.push('SurveyPage',{result:this.surveyresult});
      }
    );

  }
  onLogOut(){
  //  this.logout.loggingout();
    this.http.loggingout(this.session.getUsername()).subscribe(
      (res: any)=>{
        let result=res.status;
        if(result=='SUCCESS'){
          this.session.deleteToken();
          this.navCtrl.setRoot(HomePage);//hre the mistake was done by putting variable in single quotes
        }
      }
    );
    //  this.logout.loggingout();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
