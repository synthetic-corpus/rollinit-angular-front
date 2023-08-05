export interface Npcs {
  name: string,
  initiative: number,
  ac?: number,
  notes?: string,
  roll_method?: string
}

export interface EncounterHttp {
  _campaign_id?: string,
  name: string,
  npcs?: Npcs[]
}

export interface EncounterPatch {
  _campaign_id?:string
  name?: string,
  npcs?: Npcs[]
}
