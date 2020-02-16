import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {

  public uname;
  public pwd;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uname= this.navParams.data.username;
    this.pwd = this.navParams.data.password;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
  }

}
