import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { CooperativeView } from '../../gest-coop/shared/models/coop.model';
import { EventView } from '../../gest-coop/shared/models/event.model';
import { GestcoopService } from '../../gest-coop/shared/services/gestcoop.service';
import { GesteventService } from '../../gest-coop/shared/services/gestevent.service';

@Component({
  selector: 'app-coop-view',
  templateUrl: './coop-view.component.html',
  styleUrls: ['./coop-view.component.scss']
})
export class CoopViewComponent implements OnInit {
  listEvents: EventView[] = []
  selectedEvent!: EventView        // TODO: attribut selectedEvent non initialisé !
  selectedCoop!: CooperativeView   // TODO: attribut selectedEvent non initialisé !
  eventPopupVisible: boolean = false;

  // Sakai Table properties
  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private gestCoopService: GestcoopService,
    private gestEventService: GesteventService
  ) { }

  ngOnInit(): void {
    this.getAllEvents()
    this.loading = false;
  }

  getAllEvents(){
    this.gestEventService.getAllEvents().subscribe({
      next : (res : EventView[]) => {
        this.listEvents = res
      }
    })
  }

  getOneCoop(id: number) {
    if (id != 0) {
      this.gestCoopService.getOneCoop(id).subscribe({
        next : (res : CooperativeView) => {
          this.selectedCoop = res
        }
      })
    }
  }

  showEvent(event: EventView){
    this.eventPopupVisible = true
    this.selectedEvent = event
    this.getOneCoop(event.coop_id)
  }

  eventViewClosed(eventId: number){
    this.eventPopupVisible = false
  }


  participate(eventId: number) {
    // TODO: Not sure I need to do something here...
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
