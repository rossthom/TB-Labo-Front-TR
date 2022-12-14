import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { forkJoin, map } from 'rxjs';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { EventService } from 'src/app/gest-coop/shared/services/event.service';
import { UserView } from 'src/app/shared/models/user.model';
import { Co2Service } from 'src/app/shared/services/co2.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coop-view',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  listEvents: EventView[] = []
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialis√© !
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialis√© !
  connectedUser!: UserView;        // TODO: attribut connectedUser non initialis√© !

  redDistance = environment.redDistance;
  orangeDistance = environment.orangeDistance;

  // Sakai Table properties
  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;


  constructor(
    private eventService: EventService,
    private userAuthService: UserAuthService,
    private userService: UserService,
    private co2Service: Co2Service
  ) { }

  ngOnInit(): void {
    this._getData()
  }

  private _getData() {
    forkJoin([
      this.eventService.getAllEvents(), 
      this.userService.getOneUser(this.userAuthService.connectedUserId)
    ])
    .pipe(
      map((res) => {
        res[0].sort(
          (e1, e2) => {
            let firstDate = e1.datetime_start;
            let secondDate = e2.datetime_start;
          
            if (firstDate < secondDate) return -1;
            if (firstDate > secondDate) return 1;
            return 0;
          }
        );
        return res;
        })
    )
    .subscribe({
      next: ([events, user]: [EventView[], UserView]) => {
        this.listEvents = events
        this.connectedUser = user

        // lib√©rer la construction de la carte et de la table
        this.loading = false;
      }
    })
  }

  checkDistance(event: EventView){
    return this.co2Service.getMarkSign(
      this.co2Service.calculateRoughDistanceInMeters(this.connectedUser.gps, event.gps)
    )
  }

  checkUserParticipation(event: EventView): boolean{
    return this.connectedUser?.events_participation.includes(event?.id)
  }
  

  // Sakai Table Methods
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
}
