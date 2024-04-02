import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse,} from "@angular/common/http";
import {catchError, map, tap, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


    constructor(private http: HttpClient) {
    }



    getExtrnalProducts(searchText: string) {
        return this.http.get<any>('https://real-time-amazon-data.p.rapidapi.com/search',
            {
                headers: {
                    'X-RapidAPI-Key': '34eeb35e8bmsha15c9152067c466p13d0dfjsn8a709befbb4b',
                    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
                },
                params: {
                    query: 'Phone',
                    page: '1',
                    brand: searchText
                },
                reportProgress: true,
                observe: 'events'
            }
        ).pipe(tap(event => {
            if (event.type == HttpEventType.DownloadProgress) {
                const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
                console.log(percentDone)
            }
        }),
        map((event) => {
        if ( event instanceof HttpResponse) {
                return event.body ;
            }
           return null ;
        }),catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        window.alert('Something bad happened; please try again later.')
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

}