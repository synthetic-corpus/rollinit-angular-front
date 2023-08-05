import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
/*
  Each of these represent one character in initiative order.
*/
@Component({
  selector: 'app-tumbler',
  templateUrl: './tumbler.component.html',
  styleUrls: ['./tumbler.component.css']
})
export class TumblerComponent implements OnInit {
  @Output() deleteTumbler = new EventEmitter<string>() // Just outputs its web_element_id
  @Output() rollAgain = new EventEmitter<{web_element_id: string, method: string}>() // Emits advantage, disadvantage, or normal

  @Input() web_element_id!: string
  @Input() name!: string
  @Input() roll!: number
  @Input() last_roll_method!: string

  active: boolean = true
  dice = faDiceD20
  constructor() { }

  ngOnInit(): void {
  }

  onToggleActive(){
    this.active = this.active === true ? false : true
  }

  onDeleteTumbler(){
    this.deleteTumbler.emit(this.web_element_id)
  }

  onReRoll(method){
    this.rollAgain.emit({web_element_id: this.web_element_id, method: method})
  }
}
