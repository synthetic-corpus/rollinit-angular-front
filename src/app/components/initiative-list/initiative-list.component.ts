import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { TentHttp } from 'src/app/services/http/interfaces/tent.interfaces';
import { TentHttpService } from 'src/app/services/http/tent-http.service'
import { WebidsService } from 'src/app/services/webids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
import { DiceTumble } from './dicetumble.class';
import { Npcs } from 'src/app/services/http/interfaces/encounter.interfaces';
@Component({
  selector: 'app-initiative-list',
  templateUrl: './initiative-list.component.html',
  styleUrls: ['./initiative-list.component.css']
})
export class InitiativeListComponent implements OnInit, OnDestroy {
  db_id!: string
  init_list: DiceTumble[] = []
  addQuickie: FormGroup

  constructor(
    private route: ActivatedRoute,
    private encountersHttp: EncounterHttpService,
    private tentHttp: TentHttpService,
    private webId: WebidsService,
    private sanitizeString: SanitizeStringsService
  ) { }

  ngOnInit(): void {
    this.addQuickie = new FormGroup({
      'nameFC': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        this.sanitizeString.mustHaveLetters()
      ]),
      'initiativeFC': new FormControl(0,[Validators.required])
    })

    this.route.params
      .subscribe(
        (params: Params) => {this.db_id = params['id']}
      )

      this.encountersHttp.retrieveEncounter(this.db_id)
        .subscribe(
          (reply: HttpReplyMessage)=>{
            // get the monsters. Roll their init. Add to Array.
            reply.data.npcs.forEach(
              (npc: Npcs) => {
                this.init_list.push(new DiceTumble(this.webId.generate(),npc.initiative,npc.name,npc.roll_method))
                this.init_list.sort((a,b) => {return b.init - a.init})
              }
            )
          }
        )

      this.tentHttp.retrieveTents()
        .subscribe(
          (reply: HttpReplyMessage)=>{
            // Get the players. Roll their init. Add To array.
            reply.data.forEach(
              (element: TentHttp) => {
                this.init_list.push(new DiceTumble(this.webId.generate(),element.initiative,element.character,element.roll_method))
                this.init_list.sort((a,b) => {return b.init - a.init})
              }
            )
          }
        )


  }


  onDeleteElement(web_element_id:string){
    const location = this.init_list.findIndex((element)=>{return element.web_element_id === web_element_id})
    this.init_list.splice(location,1)
  }

  onReRoll(event){
    const location = this.init_list.findIndex((element)=>{return element.web_element_id === event.web_element_id})
    this.init_list[location].rollInit(event.method)
    this.init_list.sort((a,b) => {return b.init - a.init})
  }

  /*
  onSubmitQuickie(){
    const name = this.sanitizeString.sanitize(this.addQuickie.value.nameFC)
    const init_mod = this.addQuickie.value.initiativeFC
    this.addAndSort(name,init_mod)
    this.addQuickie.reset()
  }*/

  ngOnDestroy(): void {
    this.init_list.forEach(
      (element) => {
        this.webId.remove(element.web_element_id)
      }
    )
  }
}
