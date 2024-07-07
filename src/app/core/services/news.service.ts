import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/API.Model';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  getNews(page: number = 1, limit: number = 20): Observable<APIResponse> {
   
    return this.http.get<APIResponse>(
      Constant.API_URL +
        Constant.API_END_POINT.NEWS_LIST +
        `?page=${page}&limit=${limit}`
    );
  }
  getNewsDetail(slug:string): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL +
        Constant.API_END_POINT.NEWS_DETAIL+slug 
    );
  }
}
