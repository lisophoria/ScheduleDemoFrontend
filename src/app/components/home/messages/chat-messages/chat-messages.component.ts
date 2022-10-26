import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../../models/chat/chat";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  @Input() chat: Chat;
  @Input() currentUserId: number;

  constructor() { }

  ngOnInit(): void {
  }

  isSender(uniqueId: number): boolean {
    return uniqueId == this.currentUserId;
  }

}
