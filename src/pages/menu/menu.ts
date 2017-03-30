import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AddPage } from '../add/add';
import {MenuService, ItemJSON as MenuItemJSON, ItemTypes as MenuItemTypes} from '../../providers/menu-service'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  labels: string[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public $menu: MenuService
  ) {
    this.labels = $menu.items.map(item => item.label)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  presentModal() {
    let modal = this.modalCtrl.create(AddPage);
    modal.present();
  }

  onSelectItem(item) {
    this.$menu.setSelectedItem(item)
    console.log('MenuPage:onSelectItem: ', item)
  }
}
