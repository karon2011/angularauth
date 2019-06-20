import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  registerEventData = { }

  constructor(
    private _eventService: EventService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  registerEvent() {
    this._eventService.addEvents(this.registerEventData)
    .subscribe(
      res => {
        console.log(res),
        this._router.navigate(['/events'])
      },
      err => {
        console.log(err)
      }
    )
    
  }

}
