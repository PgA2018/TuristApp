import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {



  constructor(public http: HttpClient) {}

  apiUrl = 'http://localhost:3000/drgapi/';

  getHotels() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugartophotel').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}