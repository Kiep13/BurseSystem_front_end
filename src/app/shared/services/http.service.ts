import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import queryString from 'query-string';
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

  public uploadHistory(data: FormData): Observable<IHistory> {
    return this.http.post<IHistory>(this.baseUrl + 'history', data);
  }

  public addHistory(history: IHistory): Observable<IHistory> {
    return this.http.post<IHistory>(this.baseUrl + 'history', history);
  }

  public editHistory(history: IHistory): Observable<IHistory> {
    return this.http.put<IHistory>(this.baseUrl + 'history', history);
  }

  public deleteHistory(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `history/${id}`);
  }

  public getSecurities(options: IOptions): Observable<IPageContent<ISecurity>> {
    const query = queryString.stringify(options);

    return this.http.get<IPageContent<ISecurity>>(this.baseUrl + `securities/?${query}`);
  }

  public getSecurity(id: number): Observable<ISecurity> {
    return this.http.get<ISecurity>(this.baseUrl + `security/${id}`);
  }

  public uploadSecurity(data: FormData): Observable<ISecurity> {
    return this.http.post<ISecurity>(this.baseUrl + 'security', data);
  }

  public addSecurity(security: ISecurity): Observable<ISecurity> {
    return this.http.post<ISecurity>(this.baseUrl + 'security', security);
  }

  public editSecurity(security: ISecurity): Observable<ISecurity> {
    return this.http.put<ISecurity>(this.baseUrl + 'security', security);
  }

  public deleteSecurity(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `security/${id}`);
  }
}
