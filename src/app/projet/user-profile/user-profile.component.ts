import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { GestEventService } from 'src/app/gest-coop/shared/services/gest-event.service';
import { UserView } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: number = 0
  connectedUser!: UserView            // TODO: attribut connectedUser non initialisé !
  eventsParticipation!: EventView[]   // TODO: attribut eventsParticipation non initialisé !

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private userService: UserService,
    private gestEventService: GestEventService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.userId = this.activatedRoute.snapshot.params["id"]
      this.userService.getOneUser(this.userId)
        .subscribe((res: UserView) => {
          this.connectedUser = res
          this.gestEventService.getEventsFromIds(this.connectedUser.events_participation)
            .subscribe(res => this.eventsParticipation = res)
      })
    }
  }

  logout() {
    this.userAuthService.logout()
    this.router.navigate([""])
  }
}
