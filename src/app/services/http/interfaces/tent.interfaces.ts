// Used to reflect what is sent and recieved from HTTP

export interface NewTent {
  player: string,
  character: string,
  initiative: number,
  spell_dc?: number,
  passive_perception: number,
  ac: number,
  notes?: string,
  roll_method: string
}

export interface TentHttp extends NewTent {
  _id: string,
  _user_id: string
}

export interface TentPatch {
  player?: String,
  character?: String,
  initiative?: number,
  spell_dc?: number,
  passive_perception?: number,
  ac?: number,
  notes?: string,
  roll_method?: string
}
