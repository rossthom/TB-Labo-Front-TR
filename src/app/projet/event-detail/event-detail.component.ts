import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CooperativeView } from 'src/app/gest-coop/shared/models/coop.model';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { GestCoopService } from 'src/app/gest-coop/shared/services/gest-coop.service';
import { GestEventService } from 'src/app/gest-coop/shared/services/gest-event.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private gestEventService: GestEventService,
    private gestCoopService: GestCoopService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.eventId = this.activatedRoute.snapshot.params["id"]
      this.gestEventService.getOneEvent(this.eventId)
        .subscribe((event: EventView) => {
          this.event = event
          this.gestCoopService.getOneCoop(this.event.coop_id)
            .subscribe(coop => this.coop = coop)
        })
    }

    this.userService.getOneUser(this.userAuthService.connectedUserId)
      .subscribe(user => this.user = user)
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
