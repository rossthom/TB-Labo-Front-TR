import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICooperative } from '../models/coop.model';

@Component({
  selector: 'app-coop-upd',
  templateUrl: './coop-upd.component.html',
  styleUrls: ['./coop-upd.component.scss']
})
export class CoopUpdComponent implements OnInit {
  @Input()
  cooperative!: ICooperative

  @Output() 
  clickOnCoopUpdate: EventEmitter<ICooperative> = new EventEmitter<ICooperative>()

  @Output() 
  clickOnCancel: EventEmitter<ICooperative> = new EventEmitter<ICooperative>()


  constructor() { }

  ngOnInit(): void {
  }

  saveModifications(){
    //TODO: do the UPDATE on backen-side
    this.clickOnCoopUpdate.emit(this.cooperative)
    console.log('child emits "clickOnCoopUpdate"')
  }

  cancelModifications(){
    this.clickOnCancel.emit(this.cooperative)
    console.log('child emits "clickOnCancel"')
  }
}
