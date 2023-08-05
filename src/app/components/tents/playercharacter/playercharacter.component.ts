import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TentWeb } from '../../../interfaces/tent.interface'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-playercharacter',
  templateUrl: './playercharacter.component.html',
  styleUrls: ['./playercharacter.component.css']
})
export class PlayercharacterComponent implements OnInit {
  @Output() playerChanged = new EventEmitter<TentWeb>()
  @Output() playerDeleted = new EventEmitter<String>()

  @Input() _id: string
  @Input() _user_id: string
  @Input() web_element_id!: string
  @Input() player!: string
  @Input() character!: string
  @Input() initiative!: number
  @Input() passive_perception: number
  @Input() spell_dc: number
  @Input() ac!: number
  @Input() notes!: string
  @Input() roll_method!: string

  editting: boolean = false
  playerForm: FormGroup
  dice = faDiceD20

  constructor(
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.playerForm = new FormGroup({
      'playerFC': new FormControl(this.player, [Validators.required,this.sanitizeString.mustHaveLetters()]),
      'characterFC': new FormControl(this.character, [Validators.required,this.sanitizeString.mustHaveLetters()]),
      'initiativeFC': new FormControl(this.initiative,[Validators.required]),
      'passive_perceptionFC': new FormControl(this.passive_perception),
      'spell_dcFC': new FormControl(this.spell_dc),
      'armorFC': new FormControl(this.ac),
      'notesFC': new FormControl(this.notes),
      'rollFC': new FormControl(this.roll_method)
    })
  }

  toggleEdit(){
    this.editting ? this.editting = false : this.editting = true
  }

  onSubmit(){
    this.player = this.sanitizeString.sanitize(this.playerForm.value.playerFC)
    this.character = this.sanitizeString.sanitize(this.playerForm.value.characterFC)
    this.notes = this.sanitizeString.sanitize(this.playerForm.value.notesFC)
    this.playerChanged.emit({
      _id: this._id,
      _user_id: this._user_id,
      web_element_id: this.web_element_id,
      player: this.player,
      character: this.character,
      initiative: this.initiative,
      passive_perception: this.passive_perception,
      spell_dc: this.spell_dc,
      ac: this.ac,
      notes: this.notes,
      roll_method: this.roll_method
    })
    this.toggleEdit()
  }

  onChangeRoll(method: string){
    const methods = ['normal','advantage','disadvantage']
    if (methods.includes(method)){
      this.roll_method = method
      this.playerChanged.emit({
        _id: this._id,
        _user_id: this._user_id,
        web_element_id: this.web_element_id,
        player: this.player,
        character: this.character,
        initiative: this.initiative,
        passive_perception: this.passive_perception,
        spell_dc: this.spell_dc,
        ac: this.ac,
        notes: this.notes,
        roll_method: this.roll_method
      })
    }
  }

  onDeleteMe(){
    this.playerDeleted.emit(this.web_element_id)
  }


}
