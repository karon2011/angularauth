import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  registerEventData = {}

  eventForm: FormGroup;

  constructor(
    private _eventService: EventService,
    private _router: Router,
    private _auth: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: [''],
      author: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      description: ['']
    })
  }

  get f() {
    return this.eventForm.controls;
  }


  onSubmit() {
    // this.submitted = true;
    // stop here if form is invalid
    if (this.eventForm.invalid) {
      return;
    }
    // this.loading = true;
    this._eventService.addEvents(this.eventForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this._router.navigate(['/events']);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  // registerEvent() {
  //   this._eventService.addEvents(this.registerEventData)
  //     .subscribe(
  //       res => {
  //         console.log(res),
  //           this._router.navigate(['/events'])
  //       },
  //       err => {
  //         console.log(err)
  //       }
  //     )

  // }

}
