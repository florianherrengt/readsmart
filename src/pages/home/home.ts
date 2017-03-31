import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../../providers/auth-service'
import {MenuService, ItemJSON as MenuItemJson, ItemTypes as MenuItemTypes} from '../../providers/menu-service'
import {Http} from '@angular/http'

import { NavController } from 'ionic-angular';

const API_URL = 'http://localhost:5000/';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title: string;
  items: FirebaseListObservable<any[]>;
  header: string;

  constructor(
    navCtrl: NavController,
    public af: AngularFire,
    public $auth: AuthService,
    public http: Http,
    public $menu: MenuService
  ) {
    this.$menu.selectedItemChanged.subscribe(() => this.fetchItems())
    this.fetchItems()
    this.header = this.$menu.selectedItem.label.toLowerCase()
  }
  fetchItems () {
    console.log('selectedItem changed')
    this.http.get([
      API_URL,
      '?type=', MenuItemTypes[this.$menu.selectedItem.type].toLocaleLowerCase(), 
      '&sub=', this.$menu.selectedItem.label.toLowerCase()
    ].join('')).subscribe(response => {
      if (response.status !== 200) {
        return console.error(response)
      }
      console.log(response.json())
    })
    const refFromUrl = [
      'public_reading_list/',
      MenuItemTypes[this.$menu.selectedItem.type].toLocaleLowerCase(), '/',
      this.$menu.selectedItem.label.toLowerCase()
    ].join('')
    console.log(refFromUrl)
    this.items = this.af.database.list(refFromUrl, {
      query: {
        limitToLast: 50,
        orderByChild: 'created_at'
      }
    })
  }
}
