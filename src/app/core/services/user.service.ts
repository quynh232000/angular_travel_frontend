import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  APIResponse,
  ChangePassword,
  LoginModel,
  RegisterModel,
  UpdateProfile,
  WithGoogleModel,
} from '../models/API.Model';
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
  withgoogle(obj:WithGoogleModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_WITHGOOGLE,
      obj
    );
  }
  register(obj: RegisterModel): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_REGISTER,
      obj
    );
  }
  me(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_PROFILE
    );
  }
  updateProfile(obj: FormData): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_UPDATE,
      obj
    );
  }
  changePassword(obj: ChangePassword): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_CHANGE_PASSWORD,
      obj
    );
  }
  sendEmailChangePassword(email:string): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_SENDEMAILPASSWORD,
      { email }
    );
  }
  changeForgotPassword(password:string,token:string): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      Constant.API_URL + Constant.API_END_POINT.USER_CHANGEFORGETPASSWORD,
      { password,token }
    );
  }

}
