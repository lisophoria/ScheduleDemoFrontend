import { SessionStorageService } from 'angular-web-storage';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { HomeComponent } from './components/home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidenavNavigationComponent } from './components/templates/sidenav-navigation/sidenav-navigation.component';
import {MatListModule} from "@angular/material/list";
import { ProfileComponent } from './components/home/profile/profile.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { ProfileOverviewComponent } from './components/home/profile/profile-overview/profile-overview.component';
import { ProfileEditorComponent } from './components/home/profile/profile-editor/profile-editor.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MessagesComponent} from "./components/home/messages/messages.component";
import {ChatComponent} from "./components/home/messages/chat/chat.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidenavNavigationComponent,
    ProfileComponent,
    ProfileOverviewComponent,
    ProfileEditorComponent,
    MessagesComponent,
    ChatComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatTabsModule,
    ],
  providers: [SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
