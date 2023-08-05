import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ArrayService {
  // Expect to get objects with names like "web_element_id in them."
  // User for get their index and possibley mutating arrays.
  //myArray!: any[]
  constructor(
    @Inject('myArray') public myArray: any[]
  ) {}

  getElementIndex(object){
    return this.myArray.findIndex((element)=>object.web_element_id === element.web_element_id)
  }

  replaceElement(object){
    const index = this.getElementIndex(object)
    this.myArray.splice(index,1,object)
  }

  deleteElement(object){
    const index = this.getElementIndex(object)
    this.myArray.splice(index,1)
  }

  duplicateElement(object){
    const index = this.getElementIndex(object)
    this.myArray.splice(index,0,object)
  }
}
