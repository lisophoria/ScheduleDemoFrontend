import { CredentialResponse } from '../models/auth/credentialResponse';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import {Authority} from "../models/auth/authority";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let roles = next.data['roles'];

      return this.authService.isLoggedIn.pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.redirectToLogin();
            return false;
          }
          const loggedUser: CredentialResponse = this.authService.loggedUser;
          if (loggedUser != null && loggedUser.authenticated) {
            if (this.hasRequestedRoles(loggedUser, roles)) return true;
            else {
              this.redirectToLogin();
              return false;
            }
          }
          this.redirectToLogin();
          return false;
        })
      );
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }

  canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true
    }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return true;
  }

  hasRequestedRoles(loggedUser: CredentialResponse, roles: any[]): boolean {
    return loggedUser.authorities.filter((auth: Authority) => {
      for (let role of roles) {
        if(auth.authority == role) return true
      }
      return false
    }).length != 0;
  }
}
