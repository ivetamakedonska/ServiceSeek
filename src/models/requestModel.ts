export class RequestModel {
  $key:string;
  firmName:string;
  firmImg:string;
  service: string;
  date: string;
  time: string;
  moreInfo: string;
  iconName: string;
  condition: string;
  color: string;
  askedTime: string;
  userName: string;
  userImg: string;
  userId: string;
  businessId: string;
  opened: boolean;
  answered: boolean;
  openedByUser: boolean;
  duration: string;
  price: string;

  constructor({
    $key,
    firmName,
    firmImg,
    service,
    date,
    time,
    moreInfo,
    iconName,
    condition,
    color,
    askedTime,
    userName,
    userImg,
    userId,
    businessId,
    opened,
    answered,
    openedByUser,
    duration,
    price
  })
  {
    this.$key = $key;
    this.firmName = firmName;
    this.firmImg = firmImg;
    this.service = service;
    this.date = date;
    this.time = time;
    this.moreInfo = moreInfo;
    this.iconName = iconName;
    this.color = color;
    this.condition = condition;
    this.askedTime = askedTime;
    this.userName = userName;
    this.userImg = userImg;
    this.userId = userId;
    this.businessId = businessId;
    this.opened = opened;
    this.answered = answered;
    this.openedByUser = openedByUser;
    this.duration = duration;
    this.price = price;
  }
}
