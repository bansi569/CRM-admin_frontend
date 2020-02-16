import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController,NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { SessionDataProvider } from '../../providers/session-data/session-data';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public admin;
  public username;
  public password;
  public phone;
  public email;
  public value
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider,public toastctrl:ToastController,public session: SessionDataProvider) {
    this.admin=this.navParams.data.usr;
    this.value=1;
    console.log('from register page constructor');
  }
onRegister(){

  this.http.register(this.username,this.password,this.phone,this.email).subscribe(
    (res)=>{
      let result=res.status;
      let msg=res.message;
      if(result=='SUCCESS'){
      let toast=this.toastctrl.create({
        message:msg,
        duration: 3000
      });
      toast.present();
    }

    else if(result=='NOTSUCCESS'){
      let toast=this.toastctrl.create({
        message:msg,
        duration: 3000
      });
      toast.present();
    }
  }
  )

}
viewUserProfile(){
  console.log("Clicked!");

  this.navCtrl.push('ProfilePage',{adm:this.admin});
}
onLogOut(){
  //this.logout.loggingout();
  this.http.loggingout(this.session.getUsername()).subscribe(
    (res: any)=>{
      console.log(res);
      let result=res.status;
      if(result=='SUCCESS'){
        this.session.deleteToken();
        this.navCtrl.setRoot(HomePage);
      }
    },
    () => {
      console.log("None executed@");
    }
  );
  //  this.logout.loggingout();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

  }

}
