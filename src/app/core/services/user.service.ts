import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, LoginModel, RegisterModel } from '../models/API.Model';
import { Observable } from 'rxjs';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(obj: LoginModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_LOGIN,
      obj
    );
  }
  register(obj: RegisterModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_REGISTER,
      obj
    );
  }
  me():Observable<APIResponse>{
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_PROFILE
    )
  }
}
