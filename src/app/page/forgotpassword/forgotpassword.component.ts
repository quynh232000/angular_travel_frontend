import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  email: string = '';
  loading: boolean = false;
  messError: string = '';
  messSuccess: string = '';
  messMail: string = '';
  constructor(private userService: UserService) {}

  onSubmit() {
    this.messError = '';
    this.messSuccess = '';
    this.messMail = '';
    if (this.email == '' && !this.messSuccess) {
      this.messMail = 'Vui lòng nhập đầy đủ thông tin!';
    } else {
      this.loading = true;
      this.userService.sendEmailChangePassword(this.email).subscribe((res) => {
        this.loading = false;
        if (res.status) {
          this.messSuccess =
            'Chúng tôi đã gửi email xác nhận cho bạn. Vui lòng kiểm tra hộp thư đến để tiếp tục.';
        } else {
          this.messError = res.message;
        }
      });
    }
  }
}
