import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserModel } from '../../core/models/API.Model';
import { Constant } from '../../core/constant/Constant';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-layoutaccount',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './layoutaccount.component.html',
  styleUrl: './layoutaccount.component.css',
})
export class LayoutaccountComponent {
  user: UserModel = new UserModel();
  isLogin: boolean = !!localStorage.getItem(Constant.TOKEN_KEY);
  currentPath: string[] =[];
  constructor(private storeService: StoreService, private router: Router,private routerActive:ActivatedRoute) {
    if(this.isLogin){
      this.storeService.user$.subscribe((user) => {
        this.user = user;
      });

    }
   
  }
  ngOnInit() {
    if (!this.isLogin) {
      this.router.navigateByUrl('/login');
    }
    
  }
  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
