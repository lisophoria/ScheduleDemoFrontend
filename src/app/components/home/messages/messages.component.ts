import { Component, OnInit } from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {Chat} from "../../../models/chat/chat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messageService: MessagesService,
              private router: Router) { }

  chats: Chat[];

  ngOnInit(): void {
    this.messageService.getAllChats().subscribe((data) => {
      this.chats = data;
    })
  }

  openChat(chatId: Number): void {
    this.router.navigateByUrl('home/messages/' + chatId);
  }

}
