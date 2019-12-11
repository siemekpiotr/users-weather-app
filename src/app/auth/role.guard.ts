import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.globalService.actualUser.admin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
