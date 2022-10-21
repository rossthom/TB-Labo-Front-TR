import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin, map, Subscription } from 'rxjs';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { CoopService } from 'src/app/gest-coop/shared/services/coop.service';
import { EventService } from 'src/app/gest-coop/shared/services/event.service';
import { OsmService } from 'src/app/openstreetmap/shared/services/osm.service';
import { UserDtoUpdParticipation, UserView } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
})
export class EventDetailComponent implements OnInit {
  private _subscriptionOsmServ: Subscription = new Subscription();
  
  eventId: number = 0
  event!: EventView        // TODO: attribut event non initialisé !
  coop!: CooperativeView   // TODO: attribut coop non initialisé !
  user!: UserView          // TODO: attribut user non initialisé !

  geoJsonFeatures!: any    // TODO: attribut geoJsonFeatures non initialisé !
  distance: number = 0
  duration: number = 0
  meta_attribution: string = ""
  meta_engine_version: string = ""
  
  /**
   * ℹ️ Hypothèse de base pour le calcul: 
   * Une voiture qui consomme 5 litre/100km va émettre 5L x 2392 g/L / 100 (par km) = 120 g CO2/km.
   */
  private _defaultConso = 5
  private _defaultEmissions = 2392
  totalEmissions: number = 0

  /**
   * ℹ️ Permet de charger la carte seulement une fois toutes les données chargées.
   * Sinon, la carte ne récupère pas les données GeoJSON à temps pour s'initialiser correctement.
   * Le chargement de la carte est protégé par un *ngIf sur loading.
   */
  loading: boolean = true;    


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private gestEventService: EventService,
    private coopService: CoopService,
    private osmService: OsmService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.eventId = this.activatedRoute.snapshot.params["id"]
      
      this._getData()
    }
  }

  
  private _getData() {
		// I need events and users to be retrieved first, 
    // then I can get the cooperative and calculate the itinerary
    forkJoin([
      this.gestEventService.getOneEvent(this.eventId), 
      this.userService.getOneUser(this.userAuthService.connectedUserId)
    ])
			.subscribe({
				next: ([event, user]: [EventView, UserView]) => {
					this.event = event
          this.user = user

          this.coopService.getOneCoop(this.event.coop_id)
              .subscribe(coop => this.coop = coop)

          this._subscriptionOsmServ = this.osmService.getIniterary(this.user.gps, this.event.gps)
          .subscribe({
            next: (res: any) => {
              this.geoJsonFeatures = res.features
              this.distance = this.geoJsonFeatures[0].properties.summary.distance
              this.duration = this.geoJsonFeatures[0].properties.summary.duration
              this.meta_attribution = res.metadata.attribution
              this.meta_engine_version = res.metadata.engine.version
              
              this.totalEmissions = this._calculateCO2Emissions(this.distance, this._defaultConso, this._defaultEmissions)

              // libérer la construction de la carte
              this.loading = false;
            },
            error: (err) => {
              this.messageService.add(
                {
                  severity:'error', 
                  summary:'Erreur provenant du service OpenRoute', 
                  detail: err.message
                }
              )
              console.error(err.message);
            },
            complete: () => {
              this.loading = false;
              this._subscriptionOsmServ.unsubscribe();
            }
          })
				}
			})
  }

  /**
   * Calculates how much CO2 is emitted for the travel, depending on the car's performences
   * @param {number} distanceInM - distance to travel in meters.
   * @param {number} conso - how much liters of gas the car uses for 100 km.
   * @param {number} emission - the CO2 emissions of the car per liter consumed.
   * @returns {number} grams of CO2 emitted for the distance travelled
   */
  private _calculateCO2Emissions(distanceInM: number, conso: number, emission: number){
    let nbKm = distanceInM/1000
    let emitPerKm = conso / 100 * emission

    return emitPerKm * nbKm * 2     // = total emissions allez-retour

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
