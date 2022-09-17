import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() firstname: String;
  @Input() lastname: String;
  @Input() username: String

}
