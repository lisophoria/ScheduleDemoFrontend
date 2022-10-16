import {Message} from "./message";

export interface Chat {
  name: string;
  uniqueId: Number;
  messages: Message[];
}
