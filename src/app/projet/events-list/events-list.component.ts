import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
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
  selectedCoop!: CooperativeView   // TODO: attribut selectedCoop non initialisé !
  connectedUser!: UserView;        // TODO: attribut connectedUser non initialisé !

  // Sakai Table properties
  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;


  constructor(
    private eventService: EventService,
    private userAuthService: UserAuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this._getData()
  }

  private _getData() {
    forkJoin([
      this.eventService.getAllEvents(), 
      this.userService.getOneUser(this.userAuthService.connectedUserId)
    ])
			.subscribe({
				next: ([events, user]: [EventView[], UserView]) => {
					this.listEvents = events
          this.connectedUser = user

          // libérer la construction de la carte et de la table
          this.loading = false;
				}
			})
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
