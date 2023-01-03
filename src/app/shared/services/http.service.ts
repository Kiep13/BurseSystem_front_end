import { HttpClient } from '@angular/common/http';
import queryString from 'query-string';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IHistory, IOptions, IPageContent, ISecurity } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = `https://0f61c2d3-b558-475c-8aba-727a311039e1.mock.pstmn.io/`;

  constructor(private http: HttpClient) {
  }

  public getHistories(options: IOptions): Observable<IPageContent<IHistory>> {
    const query = queryString.stringify(options);

    return this.http.get<IPageContent<IHistory>>(this.baseUrl + `histories/?${query}`);
  }

  public getHistory(id: number): Observable<IHistory> {
    return this.http.get<IHistory>(this.baseUrl + `history/${id}`);
  }

  public uploadHistory(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'uploadHistory', data);
  }

  public addHistory(history: IHistory): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addHistory', history);
  }

  public editHistory(history: IHistory): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'editHistory', history);
  }

  public deleteHistory(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteHistory/${id}`);
  }

  public getSecurities(options: IOptions): Observable<IPageContent<ISecurity>> {
    const query = queryString.stringify(options);

    return this.http.get<IPageContent<ISecurity>>(this.baseUrl + `securities/?${query}`);
  }

  public getSecurity(id: number): Observable<ISecurity> {
    return this.http.get<ISecurity>(this.baseUrl + `security/${id}`);
  }

  public uploadSecurity(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl + 'uploadSecurity', data);
  }

  public addSecurity(security: ISecurity): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addSecurity', security);
  }

  public editSecurity(security: ISecurity): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'editSecurity', security);
  }

  public deleteSecurity(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `deleteSecurity/${id}`);
  }

  public getTotalStatement(): Observable<IHistory[]> {
    return this.http.get<IHistory[]>(this.baseUrl + 'histories');
  }

  public getSortedTotal(options: IOptions): Observable<IHistory[]> {
    return this.http.post<IHistory[]>(this.baseUrl + 'sortedHistories', options);
  }

  public getFilteredByDataTotal(options: IOptions): Observable<IHistory[]> {
    return this.http.post<IHistory[]>(this.baseUrl + 'filteredByDataHistories', options);
  }

  public getFilteredByTitleTotal(options: IOptions): Observable<IHistory[]> {
    return this.http.post<IHistory[]>(this.baseUrl + 'filteredByTitleHistories', options);
  }
}
