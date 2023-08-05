import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { WebidsService } from 'src/app/services/webids.service';

@Component({
  selector: 'app-npcgroup',
  templateUrl: './npcgroup.component.html',
  styleUrls: ['./npcgroup.component.css']
})
export class NpcgroupComponent implements OnInit, OnDestroy {
  // Reactive Form that will have a list of NPCs to battle.
  db_id!: string // Will be the DB's unique identifier or "new"
  encounter_name: string = 'My Next Encounter'
  web_npcs: {web_element_id: string, name: string, initiative: number, ac?: number, roll_method?:string, notes?: string}[] =[]

  constructor(
    private route: ActivatedRoute,
    private encountersHttp: EncounterHttpService,
    private webId: WebidsService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) =>{this.db_id = params['id']}
      )

    this.encountersHttp.retrieveEncounter(this.db_id)
        .subscribe(
          (reply: HttpReplyMessage) =>{
            const ready_these = reply.data.npcs as {web_element_id: string, name: string, initiative: number, ac?: number, notes?: string}[]
            console.log("Before mutataion ",ready_these)
            this.web_npcs = this.readyNpcs(ready_these);
            this.encounter_name = reply.data.name
            console.log(this.web_npcs)
          }
        )
  }

  readyNpcs(npc_array: {web_element_id?:string,name: string, initiative: number, ac?: number, notes?: string}[]){
    // Adds a unqiue ID for each HTML element.
    const mutated = npc_array.map(
      (element) => {
        return element = {
          web_element_id: this.webId.generate(),
          ...element
        }
      }
    )
    return mutated
  }

  // The update, delete and Duplicate all update the array of NPCs,
  // Then Save to DB... (this is only a plan right now)
  getElementIndex(object){
    return this.web_npcs.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  onCreateNpc(newNpc){
    newNpc.web_element_id = this.webId.generate()
    this.web_npcs.push(newNpc)
    this.autoSave()
  }

  onUpdateNpc(object){
    const index = this.getElementIndex(object)
    this.web_npcs.splice(index,1,{...object})
    console.log("After Update: ",this.web_npcs)
    this.autoSave()
  }

  onDuplicateNpc(web_element_id){
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    const pushThis = {...this.web_npcs[index]}
    pushThis.web_element_id = this.webId.generate()
    this.web_npcs.splice(index,0,pushThis)
    console.log("After Duplication: ",this.web_npcs)
    this.autoSave()
  }

  onDeleteNpc(web_element_id){
    //console.log(event)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    this.web_npcs.splice(index,1)
    this.autoSave()
  }

  autoSave(){
    // Everytime a change is made it will auto-save.
    const npcs = this.web_npcs.map((element)=> {let copy = {...element}; delete copy.web_element_id; return copy})
    this.encountersHttp.updateEncounter(this.db_id,{npcs})
      .subscribe(
        (res: HttpReplyMessage)=>{
          console.log({status: res.code, message: res.message});
        }
      )
  }

  ngOnDestroy(): void {
      this.web_npcs.forEach(
        (element) => this.webId.remove(element.web_element_id)
      )
  }

}
