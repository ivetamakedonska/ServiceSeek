import {MessageModel} from "./messageModel";

export class ConversationModel {
  $key:string;
  firmName:string;
  firmImg:string;
  businessId: string;
  userName: string;
  userImg: string;
  userId: string;
  messages: Array<MessageModel>;

  constructor({
    $key,
    firmName,
    firmImg,
    businessId,
    userName,
    userImg,
    userId,
    messages
  })
  {
    this.$key = $key;
    this.firmName = firmName;
    this.firmImg = firmImg;
    this.businessId = businessId;
    this.userName = userName;
    this.userImg = userImg;
    this.userId = userId;
    this.messages = messages;
  }
}
/**
 * Created by ivetamakedonska on 2/8/17.
 */
