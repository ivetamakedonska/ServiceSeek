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
  seenByUser: boolean;
  seenByFirm: boolean;
  answeredByFirm: boolean;
  answeredByUser: boolean;

  constructor({
    $key,
    firmName,
    firmImg,
    businessId,
    userName,
    userImg,
    userId,
    messages,
      seenByUser,
      seenByFirm,
      answeredByFirm,
      answeredByUser

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
    this.seenByFirm = seenByFirm;
    this.seenByUser = seenByUser;
    this.answeredByUser = answeredByUser;
    this.answeredByFirm = answeredByFirm;
  }
}
/**
 * Created by ivetamakedonska on 2/8/17.
 */
