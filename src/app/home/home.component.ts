import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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
  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getUserInfo();
    this.subscription = this.globalService.actualUserSub.subscribe(
      () => this.userInfo = this.globalService.actualUser
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }
}

