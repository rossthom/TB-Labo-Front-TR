import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { GpsPosition } from 'src/app/openstreetmap/shared/models/types.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { Co2Service } from 'src/app/shared/services/co2.service';

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
  private _userIconUrl = 'assets/app/images/colored-marker-home.png';
  private _userIconRetinaUrl = 'assets/app/images/colored-marker-home.png';
  private _iconShadowUrl = 'assets/app/images/marker-shadow.png';

  private _boundBox: [number, number][] = []


  @Input()
  events!: EventView[]   // TODO: attribut eventGpsPos non initialisé !
  
  @Input()
  userGpsPos!: GpsPosition   // TODO: attribut userGpsPos non initialisé !
  

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
      let distance = this.co2Service.calculateRoughDistanceInMeters(this.userGpsPos, event.gps)

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
