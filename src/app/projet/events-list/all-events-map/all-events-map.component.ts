import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';

@Component({
  selector: 'app-all-events-map',
  templateUrl: './all-events-map.component.html',
  styleUrls: ['../../../shared/styles/leaflet-map.style.scss']
})
export class AllEventsMapComponent implements AfterViewInit {
  /* 🧠 Reminder
  lat (North): 50.708632 
  lon (East) : 5.6750872
  */
  private map: any;
  private _defaultTileSet = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  private _defaultAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  private _eventGreenIconUrl = 'assets/app/images/colored-marker-event.png';
  private _eventGreenIconRetinaUrl = 'assets/app/images/colored-marker-event-2x.png';
  private _eventOrangeIconUrl = 'assets/app/images/colored-marker-event-medium.png';
  private _eventOrangeIconRetinaUrl = 'assets/app/images/colored-marker-event-medium-2x.png';
  private _eventRedIconUrl = 'assets/app/images/colored-marker-event-far.png';
  private _eventRedIconRetinaUrl = 'assets/app/images/colored-marker-event-far-2x.png';
  private _userIconUrl = 'assets/app/images/colored-marker-home.png';
  private _userIconRetinaUrl = 'assets/app/images/colored-marker-home.png';
  private _iconShadowUrl = 'assets/app/images/marker-shadow.png';
  private _kmPerLatDegree = 111  // ℹ️ 1° === 111km environ à nos lattitudes

  private _boundBox: [number, number][] = []


  @Input()
  events!: EventView[]   // TODO: attribut eventGpsPos non initialisé !
  
  @Input()
  userGpsPos!: GpsPosition   // TODO: attribut userGpsPos non initialisé !
  

  constructor() { }

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

    // Adjust zoom
    this.map.fitBounds(this._boundBox)
  }

  private _drawMarkers(){
    let layerGroup: L.Marker[] = []
    
    // Add Marker for user
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
    layerGroup.push(userMarker)
    this._boundBox.push([this.userGpsPos.lat, this.userGpsPos.lon])
      
      
    // Add Marker for each event
    this.events.forEach(event => {
      let distance = Math.sqrt(
          Math.pow(this.userGpsPos.lon - event.gps.lon, 2)
          + Math.pow(this.userGpsPos.lat - event.gps.lat, 2)
        ) * this._kmPerLatDegree

      let eventIconRetinaUrl: string = ''
      let eventIconUrl: string = ''
      if (distance > 50) {  // beyond 50km
        eventIconRetinaUrl = this._eventRedIconRetinaUrl
        eventIconUrl = this._eventRedIconUrl
      }
      else if (distance > 30) { // beyond 30km
        eventIconRetinaUrl = this._eventOrangeIconRetinaUrl
        eventIconUrl = this._eventOrangeIconUrl
      }
      else { // closer than 30km
        eventIconRetinaUrl = this._eventGreenIconRetinaUrl
        eventIconUrl = this._eventGreenIconUrl
      }

      const eventIcon = L.icon({
        iconRetinaUrl: eventIconRetinaUrl,
        iconUrl: eventIconUrl,
        shadowUrl: this._iconShadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      let eventMarker = L.marker(
        [event.gps.lat, event.gps.lon],
        {icon: eventIcon}
      )
      eventMarker.bindPopup(this._makeEventsPopup(event));
        
      layerGroup.push(eventMarker)
      this._boundBox.push([event.gps.lat, event.gps.lon])
    });

    this.map.addLayer(L.layerGroup(layerGroup))
  }

  private _makeEventsPopup(event: EventView): string {
    return `
      <div>
        <h4>${ event.name }</h4>
        <span>
          <em style="text-align: center;">${ event.description }</em>
          <br />
          <br />
          📌&nbsp;${ event.address.city }
          <br />
          📅&nbsp;${ event.datetime_start.toString().split('T')[0] }
        </span>
      </div>`
  }
}
