import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { UserView } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  @Input()
  event!: EventView

  @Input()
  coop!: CooperativeView

  @Input()
  user!: UserView


  @Output() 
  clickOnEventClose: EventEmitter<number> = new EventEmitter<number>()

  @Output() 
  clickOnParticipate: EventEmitter<number> = new EventEmitter<number>()


  constructor() { }

  ngOnInit(): void {
  }

  participate(){
    alert('not yet implemented')

    this.clickOnParticipate.emit(this.event.id)
  }

  close(){
    this.clickOnEventClose.emit(this.event.id)
  }
}
