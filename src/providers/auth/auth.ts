import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Http } from "@angular/http";



export class User {
  email: string;
  constructor(email: string) {
    this.email = email;
  }
}

@Injectable()
export class AuthProvider {
  currentUser: User;
  constructor(private http: Http) {

  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.http.post('https://secret-dusk-18647.herokuapp.com/api/user/login', credentials)
          .subscribe(res => {
            console.log(res)
            // At this point make a request to your backend to make a real check!
            let access = (res.status === 200);
            this.currentUser = new User(credentials.email);
            observer.next(access);
            observer.complete();
          },
            error => {
              console.log(error);
            });


      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
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
