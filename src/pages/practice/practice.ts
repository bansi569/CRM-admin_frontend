import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PracticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-practice',
  templateUrl: 'practice.html',
})
export class PracticePage {
  public users=0;
  public storage=0;
//  public result=0;
  public ures;
  public sres;
  public count;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  /*  let ures=+this.users;
    let fir=0;
    let sec=0;
  //  console.log(ures);
    let sres=+this.storage;
  //  console.log(sres);
    fir=fir+ures;
    sec=sec+sres;
    console.log(fir);
    this.getPrice(fir,sec); */
  //  this.result=this.ures*this.sres;
  }
getUser(){
//  this.result=ures*sres;
this. ures=this.users;
this.count++;
console.log(this.ures);

}
getPlan(){
  this. sres=this.storage;
  this.count++;
  console.log(this.sres);

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PracticePage');
  }

}
