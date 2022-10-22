import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { Co2Service } from 'src/app/shared/services/co2.service';


@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['../../../shared/styles/leaflet-map.style.scss']
})
export class EventMapComponent implements AfterViewInit  {
  /* 🧠 Reminder
  lat (North): 50.708632 
  lon (East) : 5.6750872
  */
  private map: any;
  private _defaultTileSet = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  private _defaultAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  private _userIconUrl = 'assets/app/images/colored-marker-home.png';
  private _userIconRetinaUrl = 'assets/app/images/colored-marker-home.png';
  private _iconShadowUrl = 'assets/app/images/marker-shadow.png';
  
  @Input()
  eventGpsPos!: GpsPosition   // TODO: attribut eventGpsPos non initialisé !
  
  @Input()
  userGpsPos!: GpsPosition   // TODO: attribut userGpsPos non initialisé !
  
  @Input()
  geoJsonFeatures!: any    // TODO: attribut geoJsonFeatures non initialisé !


  constructor(
    private co2Service: Co2Service
  ) { }

  ngAfterViewInit(): void {
    this._initMap()
  }

  
  private _initMap(): void {
    // Init Map
    this.map = L.map('map');

    // Add base tiles
    const tiles = L.tileLayer(
      this._defaultTileSet,
      {
        maxZoom: 18,
        minZoom: 8,
        attribution: this._defaultAttribution
      }
    );
    tiles.addTo(this.map);

    // Add layers
    this._drawMarkers();
    this._drawItinerary();

    // Adjust zoom
    this.map.fitBounds([
      [this.eventGpsPos.lat, this.eventGpsPos.lon],
      [this.userGpsPos.lat, this.userGpsPos.lon]]
    )
  }

  private _drawMarkers(){
    let distance = this.geoJsonFeatures[0].properties.summary.distance

    // Add Markers for User and Event GPS positions
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
    const userMarker = L.marker(
      [this.userGpsPos.lat, this.userGpsPos.lon], 
      {icon: userIcon}
    )

    const eventIcon = L.icon({
      iconRetinaUrl: this.co2Service.getEventMarkerIcon(distance).retina,
      iconUrl: this.co2Service.getEventMarkerIcon(distance).regular,
      shadowUrl: this._iconShadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    const eventMarker = L.marker(
      [this.eventGpsPos.lat, this.eventGpsPos.lon],
      {icon: eventIcon}
    )
    
    this.map.addLayer(L.layerGroup([userMarker, eventMarker]))
  }

  private _drawItinerary(){
    const itineraryLayer = L.geoJSON(
      this.geoJsonFeatures,
      {
        style: (feature) => ({
          weight: 5,
          opacity: 0.8,
          color: '#0288D1',
          fillOpacity: 0.8,
          fillColor: '#0288D1;'
        }),
      }
    )

    this.map.addLayer(itineraryLayer);
  }
}
