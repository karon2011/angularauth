import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Observable<any> {
    return this.http.get<any>(this._eventsUrl)
      .pipe(
        catchError(this.handleError<any>('Get Event', []))
      )
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(this._eventsUrl + "/" + id)
      .pipe(
        catchError(this.handleError('Get event_id'))
      )
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }

  addEvents(event): Observable<any> {
    return this.http.post<any>(this._eventsUrl, JSON.stringify(event), httpOptions)
      .pipe(
        catchError(this.handleError(' '))
      )
  }

  updateEvent(event): Observable<any> {
    let body = { event: event }
    return this.http.put<any>(this._eventsUrl + "/" + event.id, event, httpOptions)
      // return this.http.put<any>(this._eventsUrl + "/" + event.id, event, httpOptions)
      .pipe(
        catchError(this.handleError('updateEvent'))
      )
  }

  deleteEventById(event_id: any): Observable<{}> {
    return this.http.delete(this._eventsUrl + "/" + event_id)
      .pipe(
        catchError(this.handleError('delete Event'))
      )
  }

  /* GET events whose name contains search term */
  searchEvent(term: string): Observable<Event[]> {
    term = term.trim();     // trim() : removes blanks in beginning & end of strings
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Event[]>(this._eventsUrl, httpOptions)
      .pipe(
        catchError(this.handleError<Event[]>('Search Events', []))
      )
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

}
