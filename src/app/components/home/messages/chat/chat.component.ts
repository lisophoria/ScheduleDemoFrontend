import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Chat} from "../../../../models/chat/chat";
import {MessagesService} from "../../../../services/messages.service";
import {SelfService} from "../../../../services/self.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private messagesService: MessagesService,
              private selfService: SelfService) { }

  currentChat: Chat;
  currentUserId: number;
  sendingMessageContent: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      this.messagesService.getChatById(Number(data.get('chatId'))).subscribe(
        data => {
          this.currentChat = data;
        }
      );
    })

    this.selfService.getSelfInfo().subscribe(data => {
      this.currentUserId = data.uniqueId;
    })
  }

}
