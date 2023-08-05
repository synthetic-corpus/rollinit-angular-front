export class DiceTumble {
  /*
    This class represents once character and their
    dice roll information. An array of these objects creates initiative order
  */
  private _web_element_id: string
  private _init: number
  private _init_mod: number
  private _name: string
  private _default_roll: string

  constructor(web_element_id: string ,init_mod: number,name: string,default_roll: string = 'normal'){
    this._web_element_id = web_element_id
    this._init_mod = init_mod
    this._name = name
    this._default_roll = default_roll
    this.rollInit(this._default_roll) // Initialized Initiative
  }

  get web_element_id(){return this._web_element_id}
  get init(){return this._init}
  get name(){return this._name}
  get default_roll(){return this._default_roll}

  private roll20(): number{
    return Math.floor(Math.random() * (21-1))
  }

  private rollTieBreakers(): number{
    const tie_breakers: number = (this._init_mod * .01) + ((this.roll20() + this._init_mod) * .0001)
    return tie_breakers
  }

  public rollInit(method: string){
    switch(method){
      case 'advantage':{
        this._default_roll = method
        const first_a = this.roll20()
        const second_a = this.roll20()
        const base_roll = first_a >= second_a ? first_a : second_a
        this._init = base_roll + this.rollTieBreakers()
        break
      }
      case 'disadvantage':{
        this._default_roll = method
        const first_a = this.roll20()
        const second_a = this.roll20()
        const base_roll = first_a <= second_a ? first_a : second_a
        this._init = base_roll + this.rollTieBreakers()
        break
      }
      case 'normal':{
        this._default_roll = method
        const base_roll = this.roll20()
        this._init = base_roll + this.rollTieBreakers()
        break
      }
      default: {
        console.error(`bad input ${method} for dice roll!`)
      }
    }
  }
}
