import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {SessionStorageService} from "angular-web-storage";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isPhonePortrait: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private sessionStorage: SessionStorageService,
              private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhonePortrait = result.matches;
      });
  }

  logout(): void {
    this.authService.logout()
  }

  isAuthorized(): boolean {
    let auth = this.sessionStorage.get('auth');
    return auth != null && auth != '';
  }

  updateShownPath(): string {
    return this.router.url.replaceAll('/', ' > ');
  }

  redirect(url: string) {
    this.updateShownPath();
    this.router.navigate([url]);
  }
}
