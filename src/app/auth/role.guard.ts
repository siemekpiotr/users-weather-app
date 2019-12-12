import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    if (this.globalService.actualUser.admin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
