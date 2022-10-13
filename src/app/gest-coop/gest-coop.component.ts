import { Component, OnInit } from '@angular/core';
import { ICooperative } from './models/coop.model';
import { GestcoopService } from './services/gestcoop.service';


@Component({
  selector: 'app-gest-coop',
  templateUrl: './gest-coop.component.html',
  styleUrls: ['./gest-coop.component.scss']
})
export class GestCoopComponent implements OnInit {
  coopId: number = 0
  listCoops!: ICooperative[]
  selectedCoop!: ICooperative
  
  constructor(
    private gestCoopService: GestcoopService
  ) {
  }

  ngOnInit(): void {
    this.gestCoopService.getAllCoops().subscribe({
      next : (res : ICooperative[]) => {
        this.listCoops = res
      }
    })
  }

  getOneCoop(id: number) {
    if (id != 0) {
      this.gestCoopService.getOneCoop(id).subscribe({
        next : (res : ICooperative) => {
          this.selectedCoop = res
        }
      })
    }
  }
}
