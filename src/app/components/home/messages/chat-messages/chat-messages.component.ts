import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../../models/chat/chat";
import {MessagesService} from "../../../../services/messages.service";
import {Message} from "../../../../models/chat/message";
import {Observable, map, zip} from "rxjs";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  @Input() chat: Chat;
  @Input() currentUsername: String;

  messages: Observable<Message[]>;
  currentPage: number;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.currentPage = 1;

    this.messages = this.messagesService.getChatMessages(this.chat.uniqueId, 0);
  }

  isSender(user: String): boolean {
    return user === this.currentUsername;
  }

  showMore(pageToLoad: number): void {
    let loadedMessagesObs = this.messagesService.getChatMessages(this.chat.uniqueId, pageToLoad);
    this.messages = zip(this.messages, loadedMessagesObs).pipe(
      map(obs => obs[0].concat(obs[1]))
    )
    this.currentPage++;
  }

}
