export class CategoryModel{
  $key: number;
  name: string;
  icon: string;
  color: string;
  constructor({$key, name, icon, color}: any){
    this.$key = Number($key);
    this.name = name;
    this.icon = icon;
    this.color = color;
  }
}

