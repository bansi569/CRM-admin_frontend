import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SessionDataProvider } from '../../providers/session-data/session-data';
import{PracticePage}from '../practice/practice';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username;
  public password;
  public err;

  constructor(public navCtrl: NavController, public http: HttpProvider, public session: SessionDataProvider, public toastCtrl: ToastController) {
   console.log('homepage constructor');
   console.log(this.username);
   let token = this.session.getSessionData();
   if (token != undefined && token != null && token != ''){
     this.http.keepLoggedIn().subscribe(
       (res)=>{
         let result=res.status;
         if(result=="logged_user"){
           this.navCtrl.setRoot('RegisterPage');
         }
       },
       () => {
         console.log("None executed!");
       }
     );
   }
  // this.userName.setUsername(this.username);
}
}
  onLogin(){
  //  var username="bans"
   this.http.login(this.username, this.password).subscribe(
      (res) => {
          let result=res.status;
          if (result == 'SUCCESS'){
            console.log(res.status);
            this.session.setSessionData(res.data);
            this.navCtrl.push('RegisterPage', {
              usr: this.username
            });
          }else{
              let toast = this.toastCtrl.create({
                message: result,
                duration: 3000
              });
              toast.present();
          }
      }
    );
     //this.navCtrl.push('PracticePage');
  }

}
