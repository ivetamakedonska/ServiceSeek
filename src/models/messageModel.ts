export class MessageModel {
  $key:string;
  message: string;
  date: string;
  isBusinessClient: string;
  constructor({
    $key,
    message,
    date,
    isBusinessClient
  })
  {
    this.$key = $key;
    this.message = message;
    this.isBusinessClient = isBusinessClient;
    this.date = date;
  }
}
