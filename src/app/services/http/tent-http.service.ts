import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TentPatch, NewTent } from './interfaces/tent.interfaces';
import { environment as env } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TentHttpService {

  constructor(private http: HttpClient) { }

  createTent(newTent: NewTent ){
    return this.http.post(`${env.auth.apiUri}/tent/`,newTent)
  }

  retrieveTent(id: string){
    return this.http.get(`${env.auth.apiUri}/tent/${id}`)
  }

  retrieveTents(){
    return this.http.get(`${env.auth.apiUri}/tent/`)
  }

  updateTent(id: string, patch: TentPatch){
    return this.http.patch(`${env.auth.apiUri}/tent/${id}`, patch)
  }

  deleteTent(id: string){
    return this.http.delete(`${env.auth.apiUri}/tent/${id}`)
  }
}
