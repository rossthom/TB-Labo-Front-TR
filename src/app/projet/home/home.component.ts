import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coopIsConnectedKey = environment.coopIsConnectedKey
  coopIdKey = environment.coopIdKey

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  seeCoopProfile(){
    let fromLocal = true;
    let isCoopConnect = localStorage.getItem(this.coopIsConnectedKey)
    if (!isCoopConnect) {
      fromLocal = false;
      isCoopConnect = sessionStorage.getItem(this.coopIsConnectedKey)
    }

    let coopId = fromLocal ? localStorage.getItem(this.coopIdKey) : sessionStorage.getItem(this.coopIdKey)

    if (!coopId){
      this.messageService.add({severity:'error', summary:'Connection requise', detail:'Vous devez être connécté en tant que Coopérative pourvoir votre profil'});
    }
    else {
      this.router.navigate(['/coop-admin/view/' + coopId])
    }
  }
}
