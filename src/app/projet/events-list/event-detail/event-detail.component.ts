import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { UserDtoUpdParticipation, UserView } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

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


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  checkUserParticipation(): boolean{
    return this.user?.events_participation.includes(this.event?.id)
  }

  participate(){
    alert('not yet implemented')

    let modifiedUser: UserDtoUpdParticipation = {
      id: this.user?.id,
      events_participation: this.user.events_participation
    }

    modifiedUser.events_participation.push(this.event?.id)
    this.userService.updateUserParticipation(modifiedUser)
      .subscribe(() => {
        this.clickOnParticipate.emit(this.event.id)
      })
  }

  close(){
    this.clickOnEventClose.emit(this.event.id)
  }
}
