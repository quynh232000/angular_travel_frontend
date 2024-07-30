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
  count:number = 0
  constructor(
    private StoreService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.StoreService.login$.subscribe((login) => {
      if (login) {
        this.isLogin = true;
      }else{
        this.isLogin = false;
        this.user = new UserModel();
      }
    });
    this.StoreService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }else{
        this.isLogin = false;
        this.user = new UserModel();
      }
    });
    this.StoreService.compareTours$.subscribe((data) => {
      this.count =data.length
    });

  }
  logout() {
    this.StoreService.resetUserState()
    this.isLogin = false;
    this.router.navigate(['/']);
  }
 
}
