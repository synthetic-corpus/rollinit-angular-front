export interface TentWeb {
  _id: string,
  _user_id: string,
  web_element_id: string,
  player: string,
  character: string,
  initiative: number,
  spell_dc?: number,
  passive_perception: number,
  ac: number,
  notes?: string,
  roll_method?: string
}

export interface TentPatch {
  player?: string,
  character?: string,
  initiative?: number,
  spell_dc?: number,
  passive_perception?: number,
  ac?: number,
  notes?: string,
  roll_method?: string
}
