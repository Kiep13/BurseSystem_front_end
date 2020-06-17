import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {History, HistorySecurity, Options, Security} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = `http://localhost:8080/`;

  constructor(private http: HttpClient) { }

  public getHistories(): Observable<History[]>  {
    return this.http.get<History[]>(this.baseUrl + 'histories');
  }

  public getHistoryById(id: number): Observable<History>  {
    return this.http.get<History>(this.baseUrl + `getHistory/${id}`);
  }

  public uploadHistory(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'uploadHistory', data);
  }

  public addHistory(history: History): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addHistory', history);
  }

  public editHistory(history: History): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'editHistory', history);
  }

  public deleteHistory(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteHistory/${id}`);
  }

  public getSecurities(): Observable<Security[]>  {
    return this.http.get<Security[]>(this.baseUrl + 'securities');
  }

  public getSecurityById(id: number): Observable<Security>  {
    return this.http.get<Security>(this.baseUrl + `getSecurity/${id}`);
  }

  public uploadSecurity(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl + 'uploadSecurity', data);
  }

  public addSecurity(security: Security): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addSecurity', security);
  }

  public editSecurity(security: Security): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'editSecurity', security);
  }

  public deleteSecurity(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteSecurity/${id}`);
  }

  public getTotalStatement(): Observable<HistorySecurity[]> {
    return this.http.get<HistorySecurity[]>(this.baseUrl + 'histories');
  }

  public getSortedTotal(options: Options): Observable<HistorySecurity[]> {
    return this.http.post<HistorySecurity[]>(this.baseUrl + 'sortedHistories', options);
  }

  public getFilteredByDataTotal(options: Options): Observable<HistorySecurity[]> {
    return this.http.post<HistorySecurity[]>(this.baseUrl + 'filteredByDataHistories', options);
  }

  public getFilteredByTitleTotal(options: Options): Observable<HistorySecurity[]> {
    return this.http.post<HistorySecurity[]>(this.baseUrl + 'filteredByTitleHistories', options);
  }
}
