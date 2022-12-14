import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoopAuthService } from 'src/app/gest-coop/shared/services/coop-auth.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  coopIsConnected: boolean = false;
  connectedCoopId: number = 0
  userIsConnected: boolean = false;
  connectedUserId: number = 0;


  constructor(
    private router: Router,
    private messageService: MessageService,
    private coopAuthService: CoopAuthService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.coopAuthService.$coopIsConnected
      .subscribe((isConnected: boolean) => {
        this.coopIsConnected = isConnected
        this.connectedCoopId = this.coopAuthService.connectedCoopId
      })

    this.userAuthService.$userIsConnected
      .subscribe((isConnected: boolean) => {
        this.userIsConnected = isConnected
        this.connectedUserId = this.userAuthService.connectedUserId
      })
  }


  seeCoopProfile(){
      this.router.navigate(['/profile/coop/' + this.connectedCoopId])
  }

  seeUserProfile(){
      this.router.navigate(['/profile/user/' + this.connectedUserId])
  }

  seeEventsList(){
    if (!this.userIsConnected){
      this.messageService.add({
        severity:'error', 
        summary:'Connexion requise', 
        detail:'Vous devez être connecté en tant que Participant pour voir la liste des événements'
      });
    }
    else {
      this.router.navigate(['/events'])
    }
  }
}
