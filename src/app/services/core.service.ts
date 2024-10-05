import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class CoreService {

    constructor(
        public http: HttpClient,

    ) {

    }

		getData(url:string, params:any = {}):Observable<any>{
			return this.http.get(url, params);
		}

}