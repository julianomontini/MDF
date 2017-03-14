import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {User} from "../classes/user.model";

@Injectable()
export class AuthService{

  constructor(private http: Http){

  }

  doRegister(user: User){

    const headers = new Headers({'Content-Type': 'application/json'});

    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password};

    return this.http.post('http://localhost:3000/auth/signup', body, {headers: headers}).map(
      (response: Response) => {
        return response.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error.json());
    })
  }

  doLogin(email, senha){
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = {email: email, password: senha};
    return this.http.post('http://localhost:3000/auth/login', body, {headers: headers}).map(
      (response: Response) => {
        return response.json();
      }
    ).catch((error: Response) => {
      return Observable.throw(error.json());
    })
  }

  isLogedIn(): boolean{
    return localStorage.getItem('token') != null;
  }

  isAdmin(): boolean{
    return localStorage.getItem('role') == 'admin';
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
