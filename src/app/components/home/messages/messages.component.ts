import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../../services/messages.service";
import {Chat} from "../../../models/chat/chat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

  chats: Chat[];

  constructor(private messagesService: MessagesService,
              private router: Router) { }

  ngOnInit(): void {
    this.messagesService.getAllChats().subscribe((data) => this.chats = data);
  }

  openChat(id: Number): void {
    this.router.navigateByUrl('/home/messages/' + id);
  }

}
