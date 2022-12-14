import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs';
import { EventView } from 'src/app/gest-coop/shared/models/event.model';
import { EventService } from 'src/app/gest-coop/shared/services/event.service';
import { UserView } from 'src/app/shared/models/user.model';
import { Co2Service } from 'src/app/shared/services/co2.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  userId: number = 0
  connectedUser!: UserView            // TODO: attribut connectedUser non initialis√© !
  eventsParticipation!: EventView[]   // TODO: attribut eventsParticipation non initialis√© !

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private userService: UserService,
    private gestEventService: EventService,
    private co2Service: Co2Service
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
      )
      .pipe(
        map((events) => {
          events.sort(
            (e1, e2) => {
              let firstDate = e1.datetime_start;
              let secondDate = e2.datetime_start;
            
              if (firstDate < secondDate) return -1;
              if (firstDate > secondDate) return 1;
              return 0;
            }
          );
          return events;
          })
      )
      .subscribe(events => this.eventsParticipation = events)
    }
  }

  getMarkSign(event: EventView): string {
    return this.co2Service.getMarkSign(this.co2Service.calculateRoughDistanceInMeters(this.connectedUser.gps, event.gps))
  }

  logout() {
    this.userAuthService.logout()
    this.router.navigate([""])
  }
}
