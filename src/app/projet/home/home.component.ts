import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoopLoginService } from 'src/app/shared/services/coop-login.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _coopIsConnectedKey = environment.coopIsConnectedKey
  private _coopIdKey = environment.coopIdKey
  private _userIsConnectedKey = environment.userIsConnectedKey
  private _userIdKey = environment.userIdKey
  
  coopIsConnected: boolean = false;
  userIsConnected: boolean = false;


  constructor(
    private router: Router,
    private messageService: MessageService,
    private coopLoginService: CoopLoginService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.coopLoginService.$coopIsConnected.subscribe({
      next: (isConnected: boolean) => {
        this.coopIsConnected = isConnected
      }
    })

    this.userAuthService.$userIsConnected.subscribe({
      next: (isConnected: boolean) => {
        this.userIsConnected = isConnected
      }
    })
  }

  seeCoopProfile(){
    let fromLocal = true;
    let isCoopConnect = localStorage.getItem(this._coopIsConnectedKey)
    if (!isCoopConnect) {
      fromLocal = false;
      isCoopConnect = sessionStorage.getItem(this._coopIsConnectedKey)
    }

    let coopId = fromLocal ? localStorage.getItem(this._coopIdKey) : sessionStorage.getItem(this._coopIdKey)

    if (!coopId){
      this.messageService.add({severity:'error', summary:'Connection requise', detail:'Vous devez être connecté en tant que Coopérative pourvoir votre profil'});
    }
    else {
      this.router.navigate(['/coop-admin/view/' + coopId])
    }
  }

  seeUserProfile(){
    let fromLocal = true;
    let isUserConnect = localStorage.getItem(this._userIsConnectedKey)
    if (!isUserConnect) {
      fromLocal = false;
      isUserConnect = sessionStorage.getItem(this._userIsConnectedKey)
    }

    let userId = fromLocal ? localStorage.getItem(this._userIdKey) : sessionStorage.getItem(this._userIdKey)

    if (!userId){
      this.messageService.add({severity:'error', summary:'Connection requise', detail:'Vous devez être connecté en tant que Participant pour voir votre profil'});
    }
    else {
      this.router.navigate(['/user/profile/' + userId])
    }
  }

  seeEventsList(){
    if (!this.userIsConnected){
      this.messageService.add({severity:'error', summary:'Connection requise', detail:'Vous devez être connecté en tant que Participant pour voir la liste des évènements'});
    }
    else {
      this.router.navigate(['/events'])
    }
  }
}
