import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LoginModel } from '../../core/models/API.Model';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: LoginModel = new LoginModel();
  loading: boolean = false;

  messMail: string = '';
  messPass: string = '';
  error: string = '';
  successMess: string = '';
  constructor(private UserService: UserService,private router:Router,private storeService:StoreService) {}
  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
  validatePasword(password: string) {
    // ít nhất 1 số, ít nhất 1 chữ cái thường, ít nhất 1 chữ cái viết hoa
    return String(password)
      .toLowerCase()
      .match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/);
  }
  onSubmit() {
    this.messMail = '';
    this.messPass = '';
    this.error = '';
    let isValidate = true;
    if (this.loginObj.email == '') {
      this.messMail = 'Email không được để trống!';
      isValidate = false;
    } else if (!this.validateEmail(this.loginObj.email)) {
      this.messMail = 'Email không đúng định dạng!';
      isValidate = false;
    }
    if (this.loginObj.password == '') {
      this.messPass = 'Mật khẩu không được để trống!';
      isValidate = false;
    }else if(this.loginObj.password.length <6){
      this.messPass = 'Mật khẩu phải lớn hơn 6 kí tự!';
      isValidate = false;
    }
    if(!isValidate) return 
    this.loading = true;

    this.UserService.login(this.loginObj).subscribe((res) => {
      this.loading = false;
      if(res.status){
        this.successMess ='Đăng nhập thành công!';
        this.storeService.setLogin(true)
        this.storeService.setUser(res.data)
        localStorage.setItem('TOKEN',JSON.stringify(res.meta.access_token))
        setTimeout(() => {
          this.router.navigateByUrl('/')
        }, 1500);
      }else{
        this.error= res.message
      }
      
    });
  }
}
