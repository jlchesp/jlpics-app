import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('map', { static: true }) map;

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoicGVpbmNpdG8iLCJhIjoiY2tmZ2toa2IzMGV5aTJ6bWtobXp6ZzVubSJ9._k8gU0E0BnwIsyN3xkxKBg';
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
  }

}
