import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Activity } from './activity';


@Injectable({ providedIn: 'root' })
export class ActivityService {

  private activitiesUrl = 'http://localhost:8080/activities';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET activityes from the server */
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitiesUrl)
      .pipe(
        tap(_ => (console.log("Fetched activities"))),
        catchError(this.handleError<Activity[]>('getActivities', []))
      );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const url = this.activitiesUrl + '/' + activity.id;
    return this.http.patch<Activity>(url, activity)
      .pipe(
        tap(_ => (console.log(`Updating activity ${activity.id}`))),
          catchError(this.handleError<Activity>('updateActivities'))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
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
    };
  }
}
