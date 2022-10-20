export class SendingMessage {
  content: string;
  user_id: Number;
  chat_id: Number;


  constructor(content: string, user_id: Number, chat_id: Number) {
    this.content = content;
    this.user_id = user_id;
    this.chat_id = chat_id;
  }
}
