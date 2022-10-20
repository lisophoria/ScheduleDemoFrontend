import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../models/chat/chat";
import {SendingMessage} from "../models/chat/sending-message";

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

  createNewMessage(message: SendingMessage): Observable<SendingMessage> {
    return this.http.post<SendingMessage>("/api/chats/messages", message).pipe();
  }

}
