import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../models/chat/chat";
import {Message} from "../models/chat/message";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  chatsUrl = '/api/chats/'

  constructor(private http: HttpClient) { }

  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatsUrl);
  }

  getChatById(id: Number): Observable<Chat> {
    return this.http.get<Chat>(this.chatsUrl + id);
  }

  getChatMessages(chat: Number, page: Number): Observable<Message[]> {
    return this.http.get<Message[]>(this.chatsUrl + chat + '/messages/' + page);
  }

  createNewMessage(message: Message): Observable<Message> {
    return this.http.post<Message>('/api/chats/messages', message);
  }

}
