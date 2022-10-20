import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { CoopService } from 'src/app/gest-coop/shared/services/coop.service';
import { EventService } from 'src/app/gest-coop/shared/services/event.service';
import { UserView } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-coop-view',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  listEvents: EventView[] = []
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !
  selectedCoop!: CooperativeView   // TODO: attribut selectedEvent non initialisé !
  connectedUser!: UserView;        // TODO: attribut selectedEvent non initialisé !
  //eventPopupVisible: boolean = false;

  // Sakai Table properties
  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private coopService: CoopService,
    private eventService: EventService,
    private userAuthService: UserAuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllEvents()
    this.loading = false;
  }

  getAllEvents(){
    this.eventService.getAllEvents()
      .subscribe(events => this.listEvents = events)

    this.userAuthService.$connectedUserId
      .subscribe(connectedUserId => this.userService.getOneUser(connectedUserId)
        .subscribe(user => this.connectedUser = user))
  }

  getOneCoop(id: number) {
    if (id != 0) {
      this.coopService.getOneCoop(id)
        .subscribe(coop  => this.selectedCoop = coop)
    }
  }

  checkUserParticipation(event: EventView): boolean{
    return this.connectedUser?.events_participation.includes(event?.id)
  }

  /*
  showEvent(event: EventView){
    this.eventPopupVisible = true
    this.selectedEvent = event
    this.getOneCoop(event.coop_id)
  }

  eventViewClosed(eventId: number){
    this.eventPopupVisible = false
  }


  participate(eventId: number) {
    this.userAuthService.$connectedUserId
      .subscribe(connectedUserId => this.userService.getOneUser(connectedUserId)
        .subscribe(user => this.connectedUser = user))
  }
*/

  // Sakai Table Methods
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
}
