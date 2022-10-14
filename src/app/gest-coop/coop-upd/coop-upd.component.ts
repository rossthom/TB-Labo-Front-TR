import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CooperativeView } from '../models/coop.model';

@Component({
  selector: 'app-coop-upd',
  templateUrl: './coop-upd.component.html',
  styleUrls: ['./coop-upd.component.scss']
})
export class CoopUpdComponent implements OnInit {
  @Input()
  cooperative!: CooperativeView

  @Output() 
  clickOnCoopUpdate: EventEmitter<CooperativeView> = new EventEmitter<CooperativeView>()

  @Output() 
  clickOnCancel: EventEmitter<CooperativeView> = new EventEmitter<CooperativeView>()


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
