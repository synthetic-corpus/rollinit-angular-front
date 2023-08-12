import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EncounterHttp, EncounterPatch } from './interfaces/encounter.interfaces';
import { environment as env } from '../../../environments/environment';
import { CORS } from './headers';

@Injectable({
  providedIn: 'root'
})
export class EncounterHttpService {

  constructor(private http: HttpClient) { }

  createEncounter(newEncounter: EncounterHttp ){
    return this.http.post(`${env.auth.apiUri}/encounters/`,newEncounter, CORS)
  }

  retrieveEncounter(id: string){
    return this.http.get(`${env.auth.apiUri}/encounters/${id}`, CORS)
  }

  retrieveEncounters(){
    return this.http.get(`${env.auth.apiUri}/encounters`, CORS)
  }

  updateEncounter(id: string, patch: EncounterPatch){
    return this.http.patch(`${env.auth.apiUri}/encounters/${id}`, patch, CORS)
  }

  deleteEncounter(id: string){
    return this.http.delete(`${env.auth.apiUri}/encounters/${id}`, CORS)
  }
}
