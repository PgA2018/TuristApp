import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePlacesListPage } from '../home-places-list/home-places-list';
import { HomePlacePage } from '../home-place/home-place';
import { HomeProvider } from '../../providers/home/home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hotels;

  constructor(public navCtrl: NavController, public homeProvider: HomeProvider) {}

  ionViewDidLoad(){
    this.getHotels();
  }

  getHotels(){
    this.homeProvider.getHotels()
    .then(data => {
      this.hotels = data;
      console.log(this.hotels);
    });
  }

  goToList(){
    this.navCtrl.push(HomePlacesListPage)
  }
  
  goToPlace(){
    this.navCtrl.push(HomePlacePage);
  }
}
