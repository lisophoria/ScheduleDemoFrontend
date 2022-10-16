import {UserInfo} from "../user-info";

export interface Message {
  uniqueId: Number;
  content: String;
  user: UserInfo;
}
