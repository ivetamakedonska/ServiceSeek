export class MessageModel {
  $key:string;
  message: string;
  month: string;
  time: string;
  isBusinessClient: string;
  day: string;

  constructor({
    $key,
    message,
    month,
    day,
    isBusinessClient,
    time,

  })
  {
    this.$key = $key;
    this.message = message;
    this.isBusinessClient = isBusinessClient;
    this.day = day;
    this.month = month;
    this.time = time;

  }
}
