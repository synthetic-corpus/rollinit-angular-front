import { Component, OnInit, OnDestroy } from '@angular/core';
import { TentWeb } from 'src/app/interfaces/tent.interface';
import { TentHttpService } from 'src/app/services/http/tent-http.service';
import { TentHttp } from 'src/app/services/http/interfaces/tent.interfaces';
import { WebidsService } from 'src/app/services/webids.service';
import { HttpReplyMessage } from 'src/app/interfaces/replies.interface';

@Component({
  selector: 'app-tent-group',
  templateUrl: './tent-group.component.html',
  styleUrls: ['./tent-group.component.css']
})
export class TentGroupComponent implements OnInit, OnDestroy {

  web_players: TentWeb[] = []

  constructor(
    private tentHttpService: TentHttpService,
    private webId: WebidsService
  ) { }

  ngOnInit(): void {
    this.tentHttpService.retrieveTents()
      .subscribe(
        (reply: HttpReplyMessage) => {
          const players_http = reply.data as TentHttp[]
          this.web_players = this.readyPlayers(players_http)
        }
      )
  }

  readyPlayers(player_array): TentWeb[] {
    // Ads a unique identifer to each tent that's unique for the HTML app.
    const mutated: TentWeb[] = player_array.map(
      (element) => {
        return element = {
          web_element_id: this.webId.generate(),
          ...element
        }
      }
    )
    return mutated
  }

  getElementIndex(object){
    return this.web_players.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  onUpdatePlayer(object){
    // Removes keys that can't be part of a patch object. Saves Them
    // updates array on front end.
    const index = this.getElementIndex(object)
    this.web_players.splice(index,1,{...object})
    const db_id = object._id
    const saveThis = {...object}
    delete saveThis._id
    delete saveThis._user_id
    delete saveThis.web_element_id
    this.tentHttpService.updateTent(db_id,saveThis)
      .subscribe(
        (reply) => console.log(reply)
      )
  }

  onDeletePlayer(web_element_id){
    // Deletes by access the db_id as bracket notation.
    const index = this.web_players.findIndex(element => element.web_element_id === web_element_id)
    const db_id = this.web_players[index]["_id"]
    this.web_players.splice(index,1)
    this.tentHttpService.deleteTent(db_id)
      .subscribe(
        (reply) => console.log(reply)
      )
  }

  onReload(){
    // When a new Player is added, reload all players
    this.tentHttpService.retrieveTents()
      .subscribe(
        (reply: HttpReplyMessage) => {
          const players_http = reply.data as TentHttp[]
          this.web_players = this.readyPlayers(players_http)
        }
      )
  }

  ngOnDestroy(): void {
    this.web_players.forEach(
      (element) => this.webId.remove(element.web_element_id)
    )
  }
}
