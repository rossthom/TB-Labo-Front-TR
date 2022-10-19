import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoopAuthService } from 'src/app/gest-coop/shared/services/coop-auth.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //private _coopIsConnectedKey = environment.coopIsConnectedKey
  //private _coopIdKey = environment.coopIdKey
  //private _userIsConnectedKey = environment.userIsConnectedKey
  //private _userIdKey = environment.userIdKey
  
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
    if (!this.coopIsConnected){
      this.messageService.add({
        severity:'error', 
        summary:'Connection requise', 
        detail:'Vous devez être connecté en tant que Coopérative pourvoir votre profil'
      });
    }
    else {
      this.router.navigate(['/profile/coop/' + this.connectedCoopId])
    }
  }

  seeUserProfile(){
    if (!this.userIsConnected){
      this.messageService.add({
        severity:'error', 
        summary:'Connection requise', 
        detail:'Vous devez être connecté en tant que Participant pour voir votre profil'
      });
    }
    else {
      this.router.navigate(['/profile/user/' + this.connectedUserId])
    }
  }

  seeEventsList(){
    if (!this.userIsConnected){
      this.messageService.add({
        severity:'error', 
        summary:'Connection requise', 
        detail:'Vous devez être connecté en tant que Participant pour voir la liste des évènements'
      });
    }
    else {
      this.router.navigate(['/events'])
    }
  }
}
