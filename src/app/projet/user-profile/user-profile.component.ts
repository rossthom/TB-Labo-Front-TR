import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { EventService } from 'src/app/gest-coop/shared/services/event.service';
import { UserView } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
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
    private gestEventService: EventService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]){
      this.userId = this.activatedRoute.snapshot.params["id"]
      this.userService.getOneUser(this.userId)
      .pipe(
        tap((user) => {
          this.connectedUser = user
        }),
        mergeMap(() => this.gestEventService.getEventsFromIds(this.connectedUser.events_participation))
      ).subscribe(events => this.eventsParticipation = events)
    }
  }

  logout() {
    this.userAuthService.logout()
    this.router.navigate([""])
  }
}
