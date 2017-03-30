import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs'

export enum ItemTypes {
  Reddit,
  Medium,
  HackerNews,
  RSS
}

export interface ItemJSON {
  label: string,
  type: ItemTypes
}

@Injectable()
export class MenuService {
  selectedItem: ItemJSON
  items: ItemJSON[]
  selectedItemChanged: Subject<ItemJSON> = new Subject<ItemJSON>()
  constructor(public http: Http) {
    this.items = [{
      label: 'news',
      type: ItemTypes.Reddit
    }, {
      label: 'javascript',
      type: ItemTypes.Reddit
    }]
    this.selectedItem = this.items[0]
  }

  setSelectedItem(index) {
    this.selectedItem = this.items[index]
    this.selectedItemChanged.next(this.selectedItem)
    console.log('MenuService:setSelectedItem:', this.selectedItem)
  }
}
