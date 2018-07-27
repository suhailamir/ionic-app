import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
// import {Http, ResponseOptions,Headers,HttpModule,URLSearchParams} from "@angular/http";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private http: Http, private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { 

  }
  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    // this.showLogin()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
            this.nav.setRoot(HomePage);
        } else {
            this.showError("Access Denied");
        }
    },
    error => {
        this.showError(error);
    });
  }

  // showLogin() {
  //   console.log(this.registerCredentials)
  //   this.http.post('https://secret-dusk-18647.herokuapp.com/api/user/login',this.registerCredentials)
  //     .subscribe(res => {
  //       console.log(res)
  //     },
  //     error => {
  //       this.showError(error);
  //     });
  // }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}