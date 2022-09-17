import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {routeByRole} from "../../../app-routing.module";

@Component({
  selector: 'app-sidenav-navigation',
  templateUrl: './sidenav-navigation.component.html',
  styleUrls: ['./sidenav-navigation.component.css']
})
export class SidenavNavigationComponent implements OnInit {

  navigationRoutes: any[] | null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.navigationRoutes = routeByRole[this.authService.getRole()];
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
}
