import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  // registration & login are a post request
  registerUser(user) {
    // post method takes 2 parameters : url , object, and the Type 
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    // post method takes 2 parameters : url , object, and the Type 
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    // return true if got a token, or false if not
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
