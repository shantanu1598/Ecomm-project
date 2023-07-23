import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  // ngOnInit(): void {}
  baseUrl = 'http://localhost:3000/';
  userSignUp(data: SignUp) {
    this.http
      .post(this.baseUrl + 'seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        console.warn('result==>', result);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    console.warn(data);
    this.http
      .get(
        this.baseUrl +
          'seller?email=' +
          data.email +
          '&password=' +
          data.password,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn('result', result);
        if (result && result.body && result.body.length) {
          console.warn('User Login');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.warn('Login Failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
