import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {
  }
  getExtrnalProducts(searchText : string){
      console.log(searchText)
    return this.http.get<any>('https://products-database.p.rapidapi.com/api/products',
        {
          headers : {
        'X-RapidAPI-Key': '34eeb35e8bmsha15c9152067c466p13d0dfjsn8a709befbb4b',
        'X-RapidAPI-Host': 'products-database.p.rapidapi.com'
      },
          params : {
            query: searchText,
            page: '1'
          },
        }
    )
  }
}
