export interface Character {
  type: string,
  init: number,
  stats: Object
}

export interface NPC {
  name: string,
  ac?: number,
  notes?: string,
  roll_method?: string
}

export interface PC {
  character: string,
}

export interface Tent {
  player: string,
  character: string,
  spell_dc?: number,
  passive_perception: number,
  ac: number,
  notes?: string
}
