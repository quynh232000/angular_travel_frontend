declare var google: any;

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { LoginModel, WithGoogleModel } from '../../core/models/API.Model';
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

  redirectUrl:string="/"

  messMail: string = '';
  messPass: string = '';
  error: string = '';
  successMess: string = '';
  constructor(
    private UserService: UserService,
    private router: Router,
    private route:ActivatedRoute,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.redirectUrl =(queryParams['redirect']);
    
    // init google
    google.accounts.id.initialize({
      client_id:
        '286797617106-93s1hujdambrk0jrsrse7pmnrgsqq3i8.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handleLoginWithGoogle(resp);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 360,
    });
  }
  
  handleLoginWithGoogle(data: any) {
    this.error = '';
    this.successMess=""
    const datalogin: WithGoogleModel = new WithGoogleModel();
    datalogin.id_token = data.credential;
   
   
    if (datalogin.id_token) {
      this.UserService.withgoogle(datalogin).subscribe((res) => {
        this.loading = false;
        if (res.status) {
          this.successMess = res.message;
          this.storeService.setLogin(true);
          this.storeService.setUser(res.data);
          localStorage.setItem('TOKEN', JSON.stringify(res.meta.access_token));
          setTimeout(() => {
            
            this.router.navigateByUrl(this.redirectUrl);
          }, 1500);
        } else {
          this.error = res.message;
        }
      });
    }
  }
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
    this.successMess=""
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
    } else if (this.loginObj.password.length < 6) {
      this.messPass = 'Mật khẩu phải lớn hơn 6 kí tự!';
      isValidate = false;
    }
    if (!isValidate) return;
    this.loading = true;

    this.UserService.login(this.loginObj).subscribe((res) => {
      this.loading = false;
      if (res.status) {
        this.successMess = 'Đăng nhập thành công!';
        this.storeService.setLogin(true);
        this.storeService.setUser(res.data);
        localStorage.setItem('TOKEN', JSON.stringify(res.meta.access_token));
        setTimeout(() => {
          this.router.navigateByUrl(this.redirectUrl);
        }, 1500);
      } else {
        this.error = res.message;
      }
    });
  }
}
