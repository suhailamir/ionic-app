import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { NavController, AlertController} from 'ionic-angular';
import { Http} from "@angular/http";
// import { LoginPage } from '../../pages/login/login';



export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthProvider {
  currentUser: User;

  // constructor(private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private http: Http, ) { }
  constructor( private http: Http, ) { }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        this.http.post('https://secret-dusk-18647.herokuapp.com/api/user/register', credentials)
          .subscribe(res => {
            console.log(res)
            // this.nav.setRoot(LoginPage);

            observer.next(true);
            observer.complete();
          },
            error => {
              // this.showError(error);
            });
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
