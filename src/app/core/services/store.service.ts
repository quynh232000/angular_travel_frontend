import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TourModel, UserModel } from '../models/API.Model';
import { UserService } from './user.service';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private loginSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<UserModel>(new UserModel());
  private suggesToursSubject = new BehaviorSubject<TourModel[]>([]);
  private compareSubject = new BehaviorSubject<TourModel[]>([]);

  login$ = this.loginSubject.asObservable();
  user$ = this.userSubject.asObservable();
  suggesTours$ = this.suggesToursSubject.asObservable();
  compareTours$ = this.compareSubject.asObservable();

  constructor(private userService: UserService) {
    this.loadDataInit();
  }

  setSuggessTours(tour: TourModel): void {
    const currentTours = this.suggesToursSubject.getValue();
    const checkExist = currentTours.find(
      (item: TourModel) => item.id === tour.id
    );
    if (!checkExist) {
      this.suggesToursSubject.next([tour, ...currentTours]);
    }
  }
  getSuggessTours(): TourModel[] {
    return this.suggesToursSubject.getValue();
  }
  setLogin(value: boolean) {
    this.loginSubject.next(value);
  }
  getCompareTours(): TourModel[] {
    return this.compareSubject.getValue();
  }
  setCompareTours(tour: TourModel): void {
    const currentCompareTours = this.compareSubject.getValue();
    const checkExist = currentCompareTours.find(
      (item: TourModel) => item.id === tour.id
    );
    if (!checkExist) {
      this.compareSubject.next([tour, ...currentCompareTours]);
    }
  }
  removeCompareTours(tour: TourModel): void {
    const currentCompareTours = this.compareSubject.getValue();
    const checkExist = currentCompareTours.findIndex(
      (item: TourModel) => item.id === tour.id
    );
    if (checkExist!= -1) {
      currentCompareTours.splice(checkExist, 1)
      this.compareSubject.next(currentCompareTours);
    }
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
        (res) => {
          if (res.status) {
            this.userSubject.next(res.data);
            this.loginSubject.next(true);
          } else {
            this.resetUserState();
          }
        },
        (error) => {
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
