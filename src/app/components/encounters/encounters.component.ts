import { Component, OnInit} from '@angular/core';
import { EncounterHttpService } from 'src/app/services/http/encounter-http.service';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';
import { Npcs } from 'src/app/services/http/interfaces/encounter.interfaces';


@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css']
})
export class EncountersComponent implements OnInit {

  myEncounters: {_id: string, name:string, npcs: Npcs[]}[] = []

  constructor(
    private encountersHttp: EncounterHttpService
  ) { }

  ngOnInit(): void {
    this.encountersHttp.retrieveEncounters()
      .subscribe(
        (reply: HttpReplyMessage) => {
          this.myEncounters = reply.data as {_id: string, name:string, npcs: Npcs[]}[]
        },
        (error) =>{
          console.log(error)
        }
      )
    console.log("encounters loaded at ngOnInit()")
  }

  onDeleteEncounter(db_id: string){
    this.encountersHttp.deleteEncounter(db_id)
      .subscribe(
        (res)=>{
          console.log(res)
          // Refreshes the Array of Encounters
          const index = this.myEncounters.findIndex(element => element._id === db_id)
          this.myEncounters.splice(index,1)
        }
      )
  }

}
