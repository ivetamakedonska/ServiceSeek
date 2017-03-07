import {LikesModel} from "./likesModel";
export class ItemModel {
  $key:string;
  name:string;
  img:string;
  workTimeWeekdayStart: string;
  workTimeWeekdayEnd: string;
  workTimeSaturdayStart: string;
  workTimeSaturdayEnd: string;
  workTimeSundayStart: string;
  workTimeSundayEnd: string;
  city: string;
  address: string;
  moreInfo: string;
  clicked: boolean;
  userId: string;
  subCategoryId: number;
  commentsCount: number;
  services: Array<any>;
  likes: Array<LikesModel>;

  constructor({
    $key,
    name,
    img,
    workTimeWeekdayStart,
    workTimeWeekdayEnd,
    workTimeSaturdayStart,
    workTimeSaturdayEnd,
    workTimeSundayStart,
    workTimeSundayEnd,
    city,
    address,
    moreInfo,
    clicked,
    userId,
    subCategoryId,
    commentsCount,
    services,
    likes
  })
  {
    this.$key = $key;
    this.name = name;
    this.img = img;
    this.workTimeWeekdayStart = workTimeWeekdayStart;
    this.workTimeWeekdayEnd = workTimeWeekdayEnd;
    this.workTimeSaturdayStart = workTimeSaturdayStart;
    this.workTimeSaturdayEnd = workTimeSaturdayEnd;
    this.workTimeSundayStart = workTimeSundayStart;
    this.workTimeSundayEnd = workTimeSundayEnd;
    this.city = city;
    this.address = address;
    this.moreInfo = moreInfo;
    this.clicked = clicked;
    this.userId = userId;
    this.subCategoryId = Number(subCategoryId);
    this.likes = likes || {};
    this.commentsCount = commentsCount;
    this.services = services;
  }
  isLiked(uid) {
    let keys = Object.keys(this.likes);
    for(let i=0; i<keys.length; i++) {
      if(this.likes[keys[i]].uid == uid) {
        return true;
      }
    }
    return false;
  }

  getLikeKey(uid):any {
    let keys = Object.keys(this.likes);
    for(let i=0; i<keys.length; i++) {
      if(this.likes[keys[i]].uid == uid) {
        return keys[i];
      }
    }
    return false;
  }

  getLikesLength() {
    return Object.keys(this.likes).length;
  }
}
