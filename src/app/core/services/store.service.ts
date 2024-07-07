import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/API.Model';
import { UserService } from './user.service';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private loginSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<UserModel>(new UserModel());

  login$ = this.loginSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private userService: UserService) {
    this.loadDataInit();
  }

  setLogin(value: boolean) {
    this.loginSubject.next(value);
  }

  setUser(value: UserModel) {
    this.userSubject.next(value);
  }

  isLogin(): boolean {
    return this.loginSubject.getValue();
  }

  getUser(): UserModel {
    return this.userSubject.getValue();
  }

  loadDataInit() {
    const token = localStorage.getItem(Constant.TOKEN_KEY);
    if (token) {
      this.userService.me().subscribe(
        res => {
          if (res.status) {
            this.userSubject.next(res.data);
            this.loginSubject.next(true);
          } else {
            this.resetUserState();
          }
        },
        error => {
          console.error('Failed to load user data:', error);
          this.resetUserState();
        }
      );
    } else {
      this.resetUserState();
    }
  }

   resetUserState() {
    this.userSubject.next(new UserModel());
    this.loginSubject.next(false);
    localStorage.removeItem(Constant.TOKEN_KEY);
  }
}