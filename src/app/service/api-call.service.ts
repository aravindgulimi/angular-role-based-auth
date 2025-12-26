import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  base = 'http://localhost:3000'

  constructor( private http : HttpClient) { }

  get<T>(path: string, params?: any): Observable<T>{
   let httpParams = new HttpParams();
   if(params){
    Object.keys(params).forEach(k => 
      httpParams = httpParams.set(k, params[k]));
   } 
   return this.http.get<T>(`${this.base}${path}`, 
    {params : httpParams});
  }

  post<T>(path: string, body: any){
    return this.http.post<T>(`${this.base}${path}`, body);
  }

  put<T>(path: string,body: any){
    return this.http.put<T>(`${this.base}${path}`, body);
  }

}
