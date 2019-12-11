import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HomeService } from './home.service';
import { UserInfo } from './home';
import { GlobalService } from '../global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: UserInfo;
  sub: Subscription;

  constructor(
    private auth: AuthService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getUserInfo();
    this.sub = this.globalService.actualUserSub.subscribe(
      () => {
        this.userInfo = this.globalService.actualUser;
      }
    );
  }

  ngOnDestroy(): void {
    if (!!this.sub) { this.sub.unsubscribe(); }
  }

  // getUserInfo(): void { // godd if nobody will refresh -> logic moved to global service if app was bigger i would consider using a store
  //   this.homeService.getUserInfo().subscribe(
  //     res => {
  //       this.userInfo = res;
  //       this.globalService.actualUser = res;
  //     },
  //     err => console.log(err)
  //   );
  // }

  logout(): void {
    this.auth.logout();
  }
}

