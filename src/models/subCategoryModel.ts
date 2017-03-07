/**
 * Created by ivetamakedonska on 11/20/16.
 */
export class SubCategoryModel{
  $key: number;
  categoryId: number;
  name: string;
  icon: string;
  color: string;
  constructor({$key,categoryId, name, icon, color}){
    this.$key = Number($key);
    this.categoryId = Number(categoryId);
    this.name = name;
    this.icon = icon;
    this.color = color;

  }

  // constructor({data, name, icon }: any) {
  //     this.data = data;
  // }


}
