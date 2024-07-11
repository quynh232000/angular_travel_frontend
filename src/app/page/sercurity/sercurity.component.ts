import { Component } from '@angular/core';
import { ChangePassword } from '../../core/models/API.Model';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sercurity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sercurity.component.html',
  styleUrl: './sercurity.component.css',
})
export class SercurityComponent {
  changeObj: ChangePassword = new ChangePassword();

  loading: boolean = false;
  messError: string = '';
  messSuccess: string = '';
  constructor(private userService: UserService) {}
  validatePasword(password: string) {
    // ít nhất 1 số, ít nhất 1 chữ cái thường, ít nhất 1 chữ cái viết hoa
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
    return regex.test(password);
  }
  onSubmit(): void {
    this.messError = '';
    this.messSuccess = '';
    if (
      this.changeObj.current_password == '' ||
      this.changeObj.new_password == '' ||
      this.changeObj.new_password_confirmation == ''
    ) {
      this.messError = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    if (this.changeObj.new_password.length < 6) {
      this.messError = 'ật khẩu phải dài hơn 6 kí tự!';
      return;
    }
    if (!this.validatePasword(this.changeObj.new_password)) {
      this.messError =
        'Mật khẩu phải ít nhất 1 số, 1 chữ cái thường, 1 chữ cái viết hoa!';
      return;
    }
    if (
      this.changeObj.new_password != this.changeObj.new_password_confirmation
    ) {
      this.messError = 'Mật khẩu xác nhận không trùng khớp!';
      return;
    }
    this.loading = true;

    this.userService.changePassword(this.changeObj).subscribe((res) => {
      this.loading = false;
      if (res.status) {
        this.messSuccess = 'Thay đổi mật khẩu thành công!';
      } else {
        this.messError = res.message;
      }
    });
  }
}
