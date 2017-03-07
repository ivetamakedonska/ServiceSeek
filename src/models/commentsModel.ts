export class CommentsModel {
  $key:string;
  name: string;
  comment: string;
  img: string;
  time: string;
  userId: number;
  itemId: number;

  constructor({$key, name, comment, img, time, userId, itemId})
  {
    this.$key = $key;
    this.name = name;
    this.comment = comment;
    this.img = img;
    this.time = time;
    this.userId = userId;
    this.itemId = itemId;
  }
}
