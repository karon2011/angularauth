import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventService } from 'src/app/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  events = {}
  event: any

  public form: FormGroup = this.createFormGroup();

  constructor(
    private _eventService: EventService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const event_id = this.route.snapshot.paramMap.get('id');
    this._eventService.getEventById(event_id)
      .subscribe(event => {
        // console.log("event", event)
        this.event = event
      })
  }

  ngOnInit() {
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      name: this.fb.control("", Validators.required),
      category: this.fb.control("", Validators.required),
      date: this.fb.control("", Validators.required),
      author: this.fb.control(""),
      description: this.fb.control(""),
    })
  }

  onSubmit() {
    console.log("this.form.value", this.form.value)
    this._eventService.updateEvent(this.form.value)
      .subscribe(data => {
        console.log("data", data)
        this.event = event
        console.log("this.event", this.event)
        this.form.patchValue(this.event)
        this.router.navigate(['/events/'])

      })
  }

  // eventForm = new FormGroup({
  //     name : new FormControl(''),
  //     category : new FormControl(''),
  //     date: new FormControl(''),
  //     author: new FormControl(''),
  //     description: new FormControl('')
  // })

  // onsubmit() {
  //   this._eventService.updateEvent(this.eventForm.value)
  //   .subscribe(data => {
  //     this.event = event
  //     this.eventForm.patchValue(this.event)
  //     this.router.navigate(['/events/'])
  //   })
  // }


}
