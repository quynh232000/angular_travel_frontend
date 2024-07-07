import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/Constant';
import { Observable } from 'rxjs';
import { APIResponse, OrderModel } from '../models/API.Model';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}
  getAllTours(
    page: number = 1,
    limit: number = 4,
    key: string = '',
    value: string = '',
    sortOptions: string = ''
  ): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL +
        Constant.API_END_POINT.TOUR_LIST +
        `?page=${page}&limit=${limit}&key=${key}&value=${value}&sort=${sortOptions}`
    );
  }
  getDetailTour(slug: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.TOUR_DETAIL + slug
    );
  }
  getAllProvince(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.LOCATION_PROVINCE
    );
  }
  getAllCountry(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.LOCATION_COUNTRY
    );
  }
  likeTour(id: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.TOUR_LIKE + id
    );
  }
  order(obj: OrderModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.ORDER_CREATE,
      obj
    );
  }
  getOrderDetail(id: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.ORDER_DETAIL + id
    );
  }
  getOrderHistory(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.ORDER_HISTORY
    );
  }
}
