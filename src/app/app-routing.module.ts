import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/home/profile/profile.component";
import {AuthGuard} from "./auth/auth.guard";
import {ROLE} from "./models/auth/role";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [ROLE.STUDENT, ROLE.SUPER_USER, ROLE.TEACHER]
    },
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [ROLE.STUDENT, ROLE.TEACHER]
        }
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const routeByRole: any = {
  [ROLE.STUDENT]: [
    {
      name: 'Profile',
      path: 'home/profile'
    },
  ],
  [ROLE.TEACHER]: [
    {
      name: 'Profile',
      path: 'home/profile'
    },
  ],
  [ROLE.SUPER_USER]: null,
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
