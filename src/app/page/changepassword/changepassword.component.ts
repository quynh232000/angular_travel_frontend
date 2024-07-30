import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  password: string = '';
  token: string = '';

  loading: boolean = false;

  messError: string = '';
  messPass: string = '';

  messSuccess: string = '';
  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.routeActive.paramMap.subscribe((params) => {
      const getToken: string | null = params.get('token');
      if (!getToken) {
        this.router.navigate(['/login']);
        return;
      } else {
        this.token = getToken;
      }
    });
  }
  validatePasword(password: string) {
    // ít nhất 1 số, ít nhất 1 chữ cái thường, ít nhất 1 chữ cái viết hoa
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
    return regex.test(password);
  }
  onSubmit() {
   
    this.messError = '';
    this.messPass = '';
    this.messSuccess = '';
    if (!this.password) {
      this.messPass = 'Vui lòng nhập mật khẩu!';
     
    } else if (!this.validatePasword(this.password)) {
      this.messPass =
        'Mật khẩu chứa ít nhất 1 số, 1 chữ cái thường, 1 chữ cái viết hoa';
    } else {
      this.loading = true;
      this.userService
        .changeForgotPassword(this.password, this.token)
        .subscribe((res) => {
          this.loading = false;
          if (res.status) {
            this.messSuccess = res.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          } else {
            this.messError = res.message;
          }
        });
    }
  }
}
