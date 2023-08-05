import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SanitizeStringsService {
  // This service is for temporary input Sanitization.
  // This will be used to centralize custom string validators.
  constructor() { }

  sanitize(string: string){
    // Removes characters that might be used for to create JSON, sql injection attacks etc
    if(string){
      return string.replaceAll(/[\<\>{}\-\=;\:]+/g,'')
    }
    return undefined
  }

  mustHaveLetters(){
    return (control: AbstractControl): ValidationErrors | null =>{
      const hasLetters: RegExp = /[a-zA-Z]/
      return hasLetters.test(control.value) ? null : {badString: {value: control.value}}
    }
  }

  mustBeInterger() {
    return (control: AbstractControl): ValidationErrors | null =>{
      const isInterger: RegExp = /[-?[0-9]{0,2}/
      return isInterger.test(control.value) ? null : {badString: {value: control.value}}
    }
  }
}
