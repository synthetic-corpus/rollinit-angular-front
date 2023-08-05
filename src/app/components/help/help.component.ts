import { Component, OnInit } from '@angular/core';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  dice = faDiceD20

  constructor() { }

  ngOnInit(): void {
  }

}
