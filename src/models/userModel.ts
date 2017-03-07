export class UserModel {
  name:string;
  surname: string;
  email: string;
  bussinessClient: boolean;
  uid: string;
  photo: string;
  $key: string;


  constructor({
    name,
    surname,
    email,
    uid,
    bussinessClient,
    photo,
    $key
  })
  {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.uid = uid;
    this.bussinessClient = bussinessClient;
    this.photo = photo;
    this.$key = $key;
  }
}
