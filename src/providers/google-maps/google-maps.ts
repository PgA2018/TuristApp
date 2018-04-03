import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeProvider } from '../../providers/home/home';

declare var google;
//ELIMINAR EL INFOWINDOW
@Injectable()
export class GoogleMapsProvider {
  mapElement: any;
  map: any;
  marker: any;
  apiKey: string = "AIzaSyA3uv4zlpr1Yi4Hb0h7rB7xXLNiePeBEc0";
  centerChangedCallback: any;
  markers;
  infoWindow;
  markerNombre;

  constructor(public geolocation: Geolocation,public homeProvider: HomeProvider) {
    this.getHotel();
  }
  
  getHotel(){
    this.homeProvider.getMapaAll()
    .then(data => {
      this.markers = data;
    });
  }

  init(mapElement: any, centerChangedCallback: any): Promise<any> {
    this.mapElement = mapElement;
    this.centerChangedCallback = centerChangedCallback;
    return this.loadMap();
  }

  loadMap(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == 'undefined' || typeof google.maps == "undefined") {
        window['mapInit'] = () => {
          this.initMap().then(() => {
            resolve(true);
          });
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  }

  initMap(): Promise<any> {
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: center,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          tilt: 30
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        
        this.infoWindow = new google.maps.InfoWindow({
          content:'<div id="content"><h1 id="firstHeading" class="firstHeading">' + "hola" + '</h1></div>'
        });

        for (let m of this.markers) {
          let posicion = new google.maps.LatLng(m.latitud, m.longitud);
          this.marker = new google.maps.Marker({
            map: this.map,
            title: m.nombre,
            position: posicion,
            draggable:true,
          });
          this.marker.addListener('click', function() {
            console.log("me aplastan "+m.nombre);
            this.infoWindow.open(this.map, this.marker);
          });
        }
        
        resolve(true);
      });
    });
  }
}

