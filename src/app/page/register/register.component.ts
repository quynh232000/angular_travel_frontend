import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterModel } from '../../core/models/API.Model';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerObj: RegisterModel = new RegisterModel();

  loading: boolean = false;
  errorMess: string = '';
  successMess: string = '';
  errorEmail: string = '';
  errorFull_name: string = '';
  errorPassword: string = '';
  errorPasswordConfirm: string = '';

  constructor(private UserService: UserService, private router: Router,private storeService:StoreService) {}

  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  validatePasword(password: string) {
    // ít nhất 1 số, ít nhất 1 chữ cái thường, ít nhất 1 chữ cái viết hoa
    const regex =  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
    return regex.test(password)
  }

  onSubmit(): void {
    this.errorMess = '';
    this.errorEmail = '';
    this.errorFull_name = '';
    this.errorPassword = '';
    this.errorPasswordConfirm = '';
    let isValidated = true;
    if (this.registerObj.email == '') {
      this.errorEmail = 'Email không được để trống!';
      isValidated = false;
    } else if (!this.validateEmail(this.registerObj.email)) {
      this.errorEmail = 'Email không đúng định đạng!';
      isValidated = false;
    }
    if (this.registerObj.full_name == '') {
      this.errorFull_name = 'Họ tên không được để trống!';
      isValidated = false;
    }
    if (this.registerObj.password == '') {
      this.errorPassword = 'Mật khẩu không được để trống!';
      isValidated = false;
    } else if (!this.validatePasword(this.registerObj.password)) {
      this.errorPassword =
        'Mật khẩu chứa ít nhất 1 số, 1 chữ cái thường, 1 chữ cái viết hoa';
      isValidated = false;
    }
    if (this.registerObj.password_confirmation == '') {
      this.errorPasswordConfirm = 'Thông tin không được đẻ trống!';
    } else if (
      this.registerObj.password_confirmation != this.registerObj.password
    ) {
      this.errorPasswordConfirm = 'Mật khẩu xác nhận không trùng khớp!';
      isValidated = false;
    }
    if (!isValidated) return;

    this.loading = true;
    this.UserService.register(this.registerObj).subscribe((res) => {
      this.loading = false;
      if (res.status) {
        this.successMess = 'Đăng kí tài khoản mới thành công!';
        this.successMess = 'Đăng nhập thành công!';
        this.storeService.setLogin(true)
        this.storeService.setUser(res.data)
        localStorage.setItem('TOKEN', JSON.stringify(res.meta.access_token));
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 2000);
      } else {
        this.errorMess = "Email đã tồn tại trên hệ thống!"
      }
    });
  }
}
