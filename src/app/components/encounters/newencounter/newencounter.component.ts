import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebidsService } from 'src/app/services/webids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-newencounter',
  templateUrl: './newencounter.component.html',
  styleUrls: ['./newencounter.component.css']
})
export class NewencounterComponent implements OnInit, OnDestroy {

  web_npcs: {web_element_id: string, name: string, initiative: number, ac?: number, roll_method?: string, notes?: string}[] = []

  encounterForm: FormGroup
  constructor(
    private webId: WebidsService,
    private sanitizeString: SanitizeStringsService,
    private router: Router,
    private http: EncounterHttpService,
    private campaign: CampaignService
  ) { }

  ngOnInit(): void {
    this.encounterForm =  new FormGroup({
      'encounterFC': new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        this.sanitizeString.mustHaveLetters()
      ])
    })
  }

  getElementIndex(object){
    return this.web_npcs.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  onCreateNpc(newNpc){
    newNpc.web_element_id = this.webId.generate()
    console.log(newNpc)
    this.web_npcs.push(newNpc)
  }

  onUpdateNpc(object){
    //console.log(object)
    const index = this.getElementIndex(object)
    this.web_npcs.splice(index,1,{...object})
  }

  onDuplicateNpc(web_element_id){
    //console.log(e)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    const pushThis = {...this.web_npcs[index]}
    pushThis.web_element_id = this.webId.generate()
    this.web_npcs.splice(index,0,pushThis)
  }

  onDeleteNpc(web_element_id){
    //console.log(event)
    const index = this.web_npcs.findIndex(element => element.web_element_id === web_element_id)
    this.web_npcs.splice(index,1)
  }

  onSave(){
    const npcs = this.web_npcs.map((element)=> {let copy = {...element}; delete copy.web_element_id; return copy})
    const name = this.sanitizeString.sanitize(this.encounterForm.value.encounterFC)
    const _campaign_id = this.campaign.getActiveCampaignId()
    const saveThis = {
      _campaign_id,
      name,
      npcs
    }
    console.log(
      {
        message: "Would Save this...",
        data: saveThis
      }
    )
    this.http.createEncounter(saveThis)
      .subscribe(
        (res:any)=>{
          console.log(res.body)
        }
      )
      this.router.navigate(['/encounters'],{replaceUrl: true})
  }

  ngOnDestroy(): void {
    this.web_npcs.forEach(
      (element) => this.webId.remove(element.web_element_id)
    )
}
}
