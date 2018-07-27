import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http, URLSearchParams } from "@angular/http";
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private http: Http,) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.http.post('https://secret-dusk-18647.herokuapp.com/api/user/register', this.registerCredentials)
          .subscribe(res => {
            console.log(res)
            this.nav.setRoot(HomePage);
          },
            error => {
              // this.showError(error);
            });
        // this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}