import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessagesService} from "../../../../services/messages.service";
import {Chat} from "../../../../models/chat/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private messagesService: MessagesService) { }

  activatedChat: Chat;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.messagesService.getChatById(Number(data.get('chatId'))).subscribe((data) => {
        this.activatedChat = data;
      })
    });
  }

}
