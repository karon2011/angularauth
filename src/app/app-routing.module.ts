import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { EventsComponent } from './events/event-list/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { NewEventComponent } from './new-event/new-event.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: '/events',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: ':id/edit',
    //     component: EventDetailComponent
    //   },

     /* 
     {
          path: 'new/edit',
          component: NewEventComponent
      } */

      /*  
      {
          path: ':id/edit',
          component: EventEditComponent
      },  */
    // ]
  },
  {
    path: 'special',
    component: SpecialEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'new/edit',
    component: NewEventComponent
  },
  {
    path: 'events/:id',
    component: EventDetailComponent
  },
  {
    path: 'events/:id/edit',
    component: EventEditComponent
  },
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes, {
        enableTracing: false     // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
