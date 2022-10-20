import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessagesService} from "../../../../services/messages.service";
import {Chat} from "../../../../models/chat/chat";
import {SelfService} from "../../../../services/self.service";
import {SendingMessage} from "../../../../models/chat/sending-message";

@Component({
  selector: 'app-chat-overlay',
  templateUrl: './chat-overlay.component.html',
  styleUrls: ['./chat-overlay.component.css'],
})
export class ChatOverlayComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private messagesService: MessagesService,
              private selfService: SelfService) { }

  content: string;
  activatedChat: Chat;
  currentUserId: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.messagesService.getChatById(Number(data.get('chatId'))).subscribe((data) => {
        this.activatedChat = data;
      })
    });
    this.selfService.getSelfInfo().subscribe((data) => {
      this.currentUserId = data.uniqueId;
    })
  }

  sendMessage(content: string, chatId: Number): void {
    let message = new SendingMessage(content, this.currentUserId, chatId);
    this.messagesService.createNewMessage(message).subscribe();
  }

}
