import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController,NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SessionDataProvider } from '../../providers/session-data/session-data';
import {HomePage} from '../home/home';
/**
 * Generated class for the SurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
})
export class SurveyPage {
  public rooms = [];
  //public twoway;
 //public power;
 //public inverter;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastctrl:ToastController,public http:HttpProvider, public session: SessionDataProvider) {
      let surveyresult=this.navParams.data.result;
    //  console.log('checking twoway field');
    //  console.log(this.twoway);
    //  console.log(this.surveyresult);
  /*  for(let i in this.surveyresult.length){
      this.surveyresult[i].two_way=this.twoway;
      this.surveyresult[i].power=this.power;
      this.surveyresult[i].inverter_connection=this.inverter;
    } */
     for(let rec in surveyresult){
       let record = surveyresult[rec];
       let index = this.rooms.length;
       for(var i=0;i<this.rooms.length; i++){
         console.log(record.room_name, this.rooms[i].room_name);
         if (record.room_name == this.rooms[i].room_name){
           index = i;
           break;
         }
       }
       if (index == this.rooms.length){
         this.rooms.push({
           room_name: record.room_name,
           boards: [{
             board_id: record.board_id,
             nuetral_check:record.nuetral_check,
             devices: [
               {
                 device_name: record.device_name,
                 two_way: record.two_way,
                 device_wire:record.device_wire,
                 inverter_connection: record.inverter_connection,
                 power: record.power,
                 //nuetral_check: record.nuetral_check,
                 enquiry_id: record.enquiry_id
               }
             ]
           }]
         });
       }else{
         let board_index = this.rooms[index].boards.length;
         for(var j=0;j<this.rooms[index].boards.length;j++){
           if (record.board_id == this.rooms[index].boards[j].board_id){
             board_index = j;
             break;
           }
         }
         if (board_index == this.rooms[index].boards.length){
           this.rooms[index].boards.push({
             board_id: record.board_id,
              nuetral_check:record.nuetral_check,
             devices: [
               {
                 device_name: record.device_name,
                 two_way: record.two_way,
                device_wire:record.device_wire,
                 inverter_connection: record.inverter_connection,
                 power: record.power,
                // nuetral_check: record.nuetral_check,
                 enquiry_id: record.enquiry_id
               }
             ]
           });
         }else{
           this.rooms[index].boards[board_index].devices.push({
             device_name: record.device_name,
             two_way: record.two_way,
              device_wire:record.device_wire,
             inverter_connection: record.inverter_connection,
             power: record.power,
            // nuetral_check: record.nuetral_check,
             enquiry_id: record.enquiry_id
           });
         }
       }
     }
     console.log("ROOMS", this.rooms);
  }

onSubmitSurvey(){

  console.log(this.rooms);
  this.http.submitSurvey(this.rooms).subscribe(

    (res:any)=>{
           let result=res.status;
           let msg=res.message;
          if(result=='SUCCESS'){
            let toast=this.toastctrl.create({
              message:msg,
              duration: 3000
            });
            toast.present();
          }
          else if(result=='UNSUCCESS'){
            let toast=this.toastctrl.create({
              message:msg,
              duration: 3000
            });
            toast.present();
          }
    }
  )
}
onLogOut(){
  //this.logout.loggingout();
  this.http.loggingout(this.session.getUsername()).subscribe(
    (res: any)=>{
      let result=res.status;
      console.log(res);
      if(result=='SUCCESS'){
        this.session.deleteToken();
        this.navCtrl.setRoot(HomePage);
      }
    }
  );
  //  this.logout.loggingout();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyPage');
  }

}
