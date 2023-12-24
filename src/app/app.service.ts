import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Users } from "./users";
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root',
})
export class AppService {
  constructor(private httpClient: HttpClient){}

  get(sort:string, orderby:string, search:string, currentPage:number, pageSize:number): Observable<HttpResponse<any>>{
    let url = `http://localhost:3000/Users?_page=${currentPage}&_limit=${pageSize}`;
    if(sort && orderby){
      url = `${url}&_sort=${sort}&_order=${orderby}`;
    }
    if(search){
        url = `${url}&q=${search}`;
    }
    return this.httpClient.get<HttpResponse<any>>(url,{observe:'response'});
  }
}
