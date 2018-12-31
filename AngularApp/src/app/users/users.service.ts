import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly BASE_URL = 'http://localhost:5000/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  getUser(userId:number): Observable<any> {
    return this.http.get(this.BASE_URL+"/"+userId);
  }

  addUser(user): Observable<any> {
    var data = {
      name: user.name,
      email: user.email
    };
    return this.http.post(this.BASE_URL,data);
  }

  removeUser(userId): Observable<any> {
    return this.http.delete(this.BASE_URL+"/"+userId);
  }

  updateUser(user): Observable<any> {
    var data = {
      name: user.name,
      email: user.email
    };
    return this.http.put(this.BASE_URL+"/"+user.id,data);
  }
}
