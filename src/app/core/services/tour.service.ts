import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/Constant';
import { Observable } from 'rxjs';
import { APIResponse, FilterTourModel, OrderModel, OrderVNPAYModel } from '../models/API.Model';

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

  filterTours(data: FilterTourModel): Observable<APIResponse> {
    
    let queryParams = `?page=${data.page}&limit=${data.limit}`;
    if(data.type !="") queryParams +="&type=" + data.type;
    if(data.province_start_id!="") queryParams +="&province_start_id=" + data.province_start_id;
    if(data.province_end_id!="") queryParams +="&province_end_id=" + data.province_end_id;
    if(data.number_of_day!="") queryParams +="&number_of_day=" + data.number_of_day;
    if(data.date_start!="") queryParams +="&date_start=" + data.date_start;
    if(data.price!="") queryParams +="&price=" + data.price;
    if(data.tour_pakage!="") queryParams +="&tour_pakage=" + data.tour_pakage;
    if(data.order_by!="") queryParams +="&order_by=" + data.order_by;


    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.TOUR_FILTER + queryParams
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
  orderVnpay(obj: OrderVNPAYModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.ORDER_VNPAY,
      obj
    );
  }
  orderVnpayResult(url:string,obj: OrderModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.ORDER_VNPAY_RESULT+"?"+url,
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
