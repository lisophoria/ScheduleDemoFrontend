import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../../../models/user-info";
import {SelfService} from "../../../services/self.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selfInfo: UserInfo;

  constructor(private selfService: SelfService) { }

  ngOnInit(): void {
    this.selfService.getSelfInfo().subscribe((data) => {this.selfInfo = data});
  }

}
