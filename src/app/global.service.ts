import { Injectable } from '@angular/core';
import { User } from './users/users';
import { BehaviorSubject } from 'rxjs';
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

  getUserInfo(): void {
    this.http.get<User>(this.getUserInfoUrl).subscribe(
      res => {
        this.actualUser = res;
        this.actualUserSub.next(this.actualUser);
      },
      err => console.log(err)
    );
  }
}
