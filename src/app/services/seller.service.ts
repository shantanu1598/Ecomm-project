import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../data-type';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}
  // ngOnInit(): void {}
  baseUrl = 'http://localhost:3000/';
  userSignUp(data: SignUp) {
    return this.http.post(this.baseUrl + 'seller', data);
  }
}
