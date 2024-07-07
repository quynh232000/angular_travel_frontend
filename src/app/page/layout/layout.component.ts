import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserModel } from '../../core/models/API.Model';
import { UserService } from '../../core/services/user.service';
import { Constant } from '../../core/constant/Constant';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isLogin: boolean = !!localStorage.getItem(Constant.TOKEN_KEY);
  user: UserModel = new UserModel();
  constructor(
    private StoreService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.StoreService.loadDataInit()
    this.StoreService.login$.subscribe((login) => {
      if (login) {
        this.isLogin = true;
      }
    });
    this.StoreService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });

    // const token = localStorage.getItem(Constant.TOKEN_KEY);
    // if (token) {
    //   this.UserService.me().subscribe(
    //     (res) => {
    //       if (res.status) {
    //         this.isLogin = true;
    //         this.user = res.data;
    //         this.StoreService.setLogin(true);
    //         this.StoreService.setUser(this.user);
    //       } else {
    //         this.removeData();
    //       }
    //     },
    //     (e) => {
    //       this.removeData();
    //     }
    //   );
    // } else {
    //   this.removeData();
    // }
  }
  logout() {
    this.StoreService.resetUserState()
    this.isLogin = false;
    this.router.navigate(['/']);
  }
  // removeData() {
  //   this.isLogin = false;
  //   this.user = new UserModel();
  //   localStorage.removeItem(Constant.TOKEN_KEY);
  //   this.StoreService.setLogin(false);
  //   this.StoreService.setUser(new UserModel());
  // }
}
