import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { EventService } from 'src/app/event.service';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any

  events = []

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // let event_id = this.route.snapshot.paramMap.get('id');
    this.getEvent();
  }

  getEvent() {
    let event_id = this.route.snapshot.paramMap.get('id');
    this._eventService.getEventById(event_id)
      .subscribe(event => {
        console.log("event", event)
        // console.log("event._id", event._id)
        this.event = event
      })
  }

  deleteEvent(event: Event): void {
    let event_id = this.route.snapshot.paramMap.get('id');
    console.log("event_id in delete", event_id)

    // this.events = this.events.filter(h => h !== event);
    this._eventService.deleteEventById(event_id)
      .subscribe()
  }

}
