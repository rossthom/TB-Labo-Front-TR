import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { GestCoopService } from 'src/app/gest-coop/shared/services/gest-coop.service';
import { GestEventService } from 'src/app/gest-coop/shared/services/gest-event.service';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';
import { UserDtoUpdParticipation, UserView } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  eventId: number = 0
  event!: EventView        // TODO: attribut event non initialisé !
  coop!: CooperativeView   // TODO: attribut coop non initialisé !
  user!: UserView          // TODO: attribut user non initialisé !

  geoJsonFeatures!: any    // TODO: attribut itineraryData non initialisé !
  distance: number = 0
  duration: number = 0
  
  /**
   * Hypothèse de base: 
   * Une voiture qui consomme 5 litre/100km va émettre 5L x 2392 g/L / 100 (par km) = 120 g CO2/km.
   */
  private _defaultConso = 5
  private _defaultEmissions = 2392
  totalEmissions: number = 0


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private gestEventService: GestEventService,
    private gestCoopService: GestCoopService,
    private osmService: OsmService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.eventId = this.activatedRoute.snapshot.params["id"]
      
      // I need events and users to be retrieved first, then I can calculate the itinerary
      Promise.all([
        new Promise<string>((resolve, reject) => {
          this.gestEventService.getOneEvent(this.eventId)
            .subscribe((event: EventView) => {
              this.event = event
              this.gestCoopService.getOneCoop(this.event.coop_id)
                .subscribe(coop => this.coop = coop)
            })
        }),
        
        new Promise<string>((resolve, reject) => {
          this.userService.getOneUser(this.userAuthService.connectedUserId)
          .subscribe(user => this.user = user)
        })
      ]).then((res: string[]) => {
        console.log("Gif de John Travolta tout perdu dans la vie")
        this.osmService.getIniterary(this.user.gps, this.event.gps)
        .subscribe((res: any) => {
          this.geoJsonFeatures = res.features
          this.distance = this.geoJsonFeatures[0].properties.summary.distance
          this.duration = this.geoJsonFeatures[0].properties.summary.duration
          
          this.totalEmissions = this._calculateCO2Emissions(this.distance, this._defaultConso, this._defaultEmissions)
        })
      })
      .catch((err : string) => {
        console.log(err)
      })
    }
  }

  /**
   * Calculates how much CO2 is emitted for the travel, depending on the car's performences
   * @param {number} distanceInM - distance to travel in meters.
   * @param {number} conso - how much liters of gas the car uses for 100 km.
   * @param {number} emissions - the CO2 emissions of the car per liter consumed.
   * @returns {number} grams of CO2 emitted for the distance travelled
   */
  _calculateCO2Emissions(distanceInM: number, conso: number, emission: number){
    let nbKm = distanceInM/1000
    let emitPerKm = conso / 100 * emission

    return emitPerKm * nbKm // total emissions

  }

  checkUserParticipation(): boolean{
    return this.user?.events_participation.includes(this.event?.id)
  }

  participate(){
    let modifiedUser: UserDtoUpdParticipation = {
      id: this.user?.id,
      events_participation: this.user.events_participation
    }

    modifiedUser.events_participation.push(this.event?.id)
    this.userService.updateUserParticipation(modifiedUser)
      .subscribe(_ => this.messageService.add(
        {
          severity:'success', 
          summary:'Participation Confirmée', 
          detail:"Vous êtes inscrit à " + this.event?.name
        }
      ))
  }
}
