import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnDestroy {

  private onDestroy$ = new Subject<void>();

  events = {}
  event: any

  public myForm: FormGroup = this.createFormGroup();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _eventService: EventService,
  ) {
    const event_id = this.route.snapshot.paramMap.get('id');
    this._eventService.getEventById(event_id)
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(event => {
        // this.event = event
        // this.myForm.patchValue(this.event)
        this.onEventchange(event)
      })
  }

  onEventchange(event: Event) {
    this.event = event;
    console.log("this.event", this.event)
    this.myForm = this.createFormGroup();
    this.myForm.patchValue(event || {})
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      _id: this.fb.control("", Validators.required),
      name: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      category: this.fb.control("", Validators.required),
      date: this.fb.control("", Validators.required),
      author: this.fb.control(""),
      description: this.fb.control(""),
    })
  }

  // get form() { return this.myForm.controls; }

  onSubmit() {
    this._eventService.updateEvent(this.myForm.value)
      .subscribe(data => {
        this.router.navigate(['/events', this.myForm.value._id])
      })
  }
}
