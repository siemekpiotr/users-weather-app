import { Injectable } from '@angular/core';
import { User } from './users/users';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public actualUser: User = new User();
  public actualUserSub = new BehaviorSubject(this.actualUser);
  private getUserInfoUrl = 'api/userinfo';

  constructor(
    private http: HttpClient
  ) { this.getUserInfo(); }

  userInfo(): Observable<User> {
    return this.http.get<User>(this.getUserInfoUrl);
  }

  getUserInfo(): void {
    this.userInfo().subscribe(
      res => {
        this.actualUser = res;
        console.log(this.actualUser);
        this.actualUserSub.next(this.actualUser);
      },
      err => console.log(err)
    );
  }
}
