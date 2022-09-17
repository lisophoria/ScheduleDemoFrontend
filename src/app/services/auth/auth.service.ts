import { Authority } from '../../models/auth/authority';
import { CredentialResponse } from '../../models/auth/credentialResponse';
import { Credential } from '../../models/auth/credential';
import { SessionStorageService } from 'angular-web-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
// import {ROLE, ROLE_PRIORITY, ROLE_ROUTE} from '../../models/auth/role';
import {ROLE} from '../../models/auth/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor( private router: Router,
    private http: HttpClient,
    private sessionStorage: SessionStorageService) {
      const auth = this.sessionStorage.get('auth');
      this.loggedIn.next(this.isAuthNotEmpty(auth));
     }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get loggedUser(): CredentialResponse {
    const auth = this.sessionStorage.get('auth');
    if (auth == null || auth == '') {
      return new CredentialResponse();
    }
    return JSON.parse(auth);
  }

  getRole(): ROLE {
    return this.loggedUser.authorities[0].authority;
  }

  isStudent(): boolean {
    return this.loggedUser.authorities.filter((auth: Authority) => {
      return auth.authority == ROLE.STUDENT;
    }).length != 0;
  }

  isTeacher(): boolean {
    return this.loggedUser.authorities.filter((auth: Authority) => {
      return auth.authority == ROLE.TEACHER;
    }).length != 0;
  }

  isAdmin(): boolean {
    return this.loggedUser.authorities.filter((auth: Authority) => {
      return auth.authority == ROLE.SUPER_USER;
    }).length != 0;
  }

  static checkAuthUser(auth: CredentialResponse, role: string): boolean {
    let access = false;
    if (auth != null && auth.authorities != null) {
      auth.authorities.some((el) => {
        access = el.authority === role;
        return access;
      });
    }
    return access;
  }

  static checkSection(url: string, section: string): boolean {
    return url.indexOf(section) == 0;
  }

  authenticate(crdls: Credential, failureHandler: any) {
    const headers = new HttpHeaders(crdls ? {
      authorization: 'Basic ' + btoa(crdls.username + ':' + crdls.password),
        "X-Requested-With": "XMLHttpRequest"
    } : {});

    this.authentication(headers).subscribe((data: CredentialResponse) => {
      if (data != null) {
        this.responseProcessing(data, failureHandler)
      }
    })
  }

  private responseProcessing(data: CredentialResponse, failureHandler: any) {
    const response: CredentialResponse = CredentialResponse.convertToObj(data);

    if(response.authenticated) {
      this.updateAuth(response);
      this.loggedIn.next(true);
      this.router.navigate(['']);
      return true;
    }
    else {
      failureHandler();
      return null;
    }
  }

  private updateAuth(response: CredentialResponse) {
    this.sessionStorage.set('auth', JSON.stringify(response));
  }

  logout() {
    this.clearLoginData();
    this.http.post('api/logout', {}).subscribe(response => {
      this.router.navigateByUrl('/login');
    });
  }

  clearLoginData() {
    this.loggedIn.next(false);
    this.sessionStorage.remove('auth');
  }

  authentication(headers: HttpHeaders): Observable<any> {
    return this.http.get('api/user', { headers: headers })
      .pipe(
        tap(data => console.log('login data:', data)),
        catchError(this.handleLoginError('login error', []))
    );
  }

  private isAuthNotEmpty = (auth: string) => {
    return auth != null && auth != "";
  };

  private handleLoginError<T>(operation = 'operation', result?: T) {
    console.log('handleLoginError');
    return (error: any): Observable<T> => {

      if(error.status === 401) {
        this.loggedIn.next(false);
        return of(result as T);
      }

      else if(error.status == 404) {
        this.loggedIn.next(false);
        // @ts-ignore
        return of(
          {
            errorStatus: error.status
          }
        );
      }
      return of(result as T);
    };
  }
}
