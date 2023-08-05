import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TentHttpService } from 'src/app/services/http/tent-http.service';
import { NewTent} from 'src/app/services/http/interfaces/tent.interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-newtent',
  templateUrl: './newtent.component.html',
  styleUrls: ['./newtent.component.css']
})
export class NewTentComponent implements OnInit {

  @Output() newPlayer = new EventEmitter<NewTent>()
  @Output() cancelPlayer = new EventEmitter<string>()

  constructor(
    private tentHttpservice: TentHttpService,
    private sanitize: SanitizeStringsService
  ) { }
  roll_method = 'normal'
  dice = faDiceD20
  newPlayerCharacter: FormGroup
  ngOnInit(): void {
    this.newPlayerCharacter = new FormGroup({
      playernameFC: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.sanitize.mustHaveLetters()
      ]),
      characterNameFC: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.sanitize.mustHaveLetters()
      ]),
      initiativeFC: new FormControl(0,[
        Validators.required,
        Validators.max(10),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      passive_perceptionFC: new FormControl(10,[
        Validators.required,
        Validators.max(20),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      spell_dcFC: new FormControl(null,[
        Validators.max(22),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      acFC: new FormControl(10,[
        Validators.required,
        Validators.max(30),
        Validators.min(0),
        this.sanitize.mustBeInterger()
      ]),
      notesFC: new FormControl(null,[
        Validators.minLength(3),
        Validators.maxLength(300),
        this.sanitize.mustHaveLetters()
      ])
    })
  }

  onCancelPlayer(){
    this.cancelPlayer.emit("Player Creation Cancelled")
  }

  onSave(){
    // Constructs an object ready for database, then outputs the object it got back from the database
    const playerName = this.sanitize.sanitize(this.newPlayerCharacter.value.playernameFC)
    const characterName = this.sanitize.sanitize(this.newPlayerCharacter.value.characterNameFC)

    const newCharacterObject: NewTent = {
      player: playerName,
      character: characterName,
      initiative: this.newPlayerCharacter.value.initiativeFC,
      ac: this.newPlayerCharacter.value.acFC,
      passive_perception: this.newPlayerCharacter.value.passive_perceptionFC,
      roll_method: this.roll_method
    }

    if (this.newPlayerCharacter.value.notesFC){
      const notes = this.sanitize.sanitize(this.newPlayerCharacter.value.notesFC)
      newCharacterObject.notes = notes
    }

    if (this.newPlayerCharacter.value.spell_dcFC){
      newCharacterObject.spell_dc = this.newPlayerCharacter.value.spell_dcFC
    }
    this.tentHttpservice.createTent(newCharacterObject)
      .subscribe(
        (reply) => {
          console.log(reply)
          this.newPlayer.emit(newCharacterObject) // When received, triggers a reload.
          this.newPlayerCharacter.reset()
        }
      )
  }

}
