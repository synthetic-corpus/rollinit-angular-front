import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {
  @Output() npcChanged = new EventEmitter<{web_element_id: string, name: string, initiative: number, armor?: number, roll_method?: string, notes?: string}>()
  @Output() npcDuplicated = new EventEmitter<string>()
  @Output() npcDeleted = new EventEmitter<string>()

  @Input() maxed_out!: boolean
  @Input() web_element_id!: string
  @Input() name!: string
  @Input() initiative!: number
  @Input() armor!: number
  @Input() notes!: string
  @Input() roll_method!: string

  dice = faDiceD20
  npcForm: FormGroup

  editting: boolean = false
  constructor(
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.npcForm = new FormGroup({
      'nameFC': new FormControl(this.name),
      'initiativeFC': new FormControl(this.initiative),
      'armorFC': new FormControl(this.armor),
      'notesFC': new FormControl(this.notes)
    })
  }

  toggleEdit(){
    this.editting ? this.editting = false : this.editting = true
  }

  onSubmit(){
    console.log(this.npcForm)
    this.toggleEdit()
    this.name = this.sanitizeString.sanitize(this.npcForm.value.nameFC)
    this.notes = this.sanitizeString.sanitize(this.npcForm.value.notesFC)
    this.npcChanged.emit({
      web_element_id: this.web_element_id,
      name: this.name,
      initiative: this.initiative,
      armor: this.armor,
      notes: this.notes,
      roll_method: this.roll_method
    })
  }

  onDeleteMe(){
    this.npcDeleted.emit(this.web_element_id)
  }

  onChangeRoll(method: string){

    const methods = ['normal','advantage','disadvantage']
    if (methods.includes(method)){
      this.roll_method = method
      this.npcChanged.emit({
        web_element_id: this.web_element_id,
        name: this.name,
        initiative: this.initiative,
        armor: this.armor,
        notes: this.notes,
        roll_method: this.roll_method
      })
    }

  }

  onDuplicateMe(){
    this.npcDuplicated.emit(this.web_element_id)
  }

}
