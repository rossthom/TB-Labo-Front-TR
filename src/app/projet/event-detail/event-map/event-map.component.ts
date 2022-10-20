import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';


@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements /*OnInit, */AfterViewInit  {
  /* 🧠 Reminder
  lat (North): 50.708632 
  lon (East) : 5.6750872
  */
  private map: any;
  private _eventIconUrl = 'assets/app/images/colored-marker-event.png';
  private _eventIconRetinaUrl = 'assets/app/images/colored-marker-event-2x.png';
  private _userIconUrl = 'assets/app/images/colored-marker-home.png';
  private _userIconRetinaUrl = 'assets/app/images/colored-marker-home.png';
  private _iconShadowUrl = 'assets/app/images/marker-shadow.png';

  
  @Input()
  eventGpsPos!: GpsPosition   // TODO: attribut eventGpsPos non initialisé !
  
  @Input()
  userGpsPos!: GpsPosition   // TODO: attribut userGpsPos non initialisé !
  
  @Input()
  geoJsonFeatures!: any    // TODO: attribut itineraryData non initialisé !

  constructor(
    //private osmService: OsmService
  ) { }

  /*
  ngOnInit(): void {
    this.osmService.getIniterary(this.userGpsPos, this.eventGpsPos)
      .subscribe((res: any) => {
        this.geoJsonFeatures = res.features
      })
  }
  */

  ngAfterViewInit(): void {
    this._initMap()
  }

  private _initMap(): void {
    // Init Map
    this.map = L.map('map');

    // Add tiles
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 8,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this._drawItinerary();
    this._drawMarkers();
  }

  private _drawMarkers(){
    // Add Markers for User and Event GPS positions
    const eventIcon = L.icon({
      iconRetinaUrl: this._eventIconRetinaUrl,
      iconUrl: this._eventIconUrl,
      shadowUrl: this._iconShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.marker(
      [this.eventGpsPos.lat, this.eventGpsPos.lon],
      {icon: eventIcon}
    ).addTo(this.map);
    
    const userIcon = L.icon({
      iconRetinaUrl: this._userIconRetinaUrl,
      iconUrl: this._userIconUrl,
      shadowUrl: this._iconShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.marker(
      [this.userGpsPos.lat, this.userGpsPos.lon], 
      {icon: userIcon}
    ).addTo(this.map);

    this.map.fitBounds([
      [this.eventGpsPos.lat, this.eventGpsPos.lon],
      [this.userGpsPos.lat, this.userGpsPos.lon]])
  }

  private _drawItinerary(){
    /*const itineraryLayer = */L.geoJSON(
      this.geoJsonFeatures,
      {
        style: {
          color: '#008f68',
          weight: 3,
          opacity: 0.5,
          //fillOpacity: 0.8,
          //fillColor: 'none'
        }
      }
    ).addTo(this.map);

    //this.map.addLayer(itineraryLayer);
  }
}
