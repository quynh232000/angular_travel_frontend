import { Component } from '@angular/core';
import { UpdateProfile, UserModel } from '../../core/models/API.Model';
import { Constant } from '../../core/constant/Constant';
import { StoreService } from '../../core/services/store.service';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  userObj: UpdateProfile = new UpdateProfile();
  selectedFile: File | null = null;
  user: UserModel = new UserModel();
  isLogin: boolean = !!localStorage.getItem(Constant.TOKEN_KEY);
  previewUrl: string | ArrayBuffer | null = null;

  messSuccess: string = '';
  messError: string = '';
  loading: boolean = false;

  constructor(
    private storeService: StoreService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.storeService.user$.subscribe((user) => {
      this.user = user;
      this.previewUrl = user.avatar;
      this.userObj.full_name = user.full_name;
      this.userObj.address = user.address;
      this.userObj.phone_number = user.phone_number;
    });
  }
  handlechangeImg(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.previewUrl = e.target?.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.messError = '';
    this.messSuccess = '';
    if (
      this.userObj.full_name == '' ||
      this.userObj.phone_number == '' ||
      this.userObj.address == ''
    ) {
      this.messError = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    this.loading = true;
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }
    formData.append('full_name', this.userObj.full_name);
    formData.append('address', this.userObj.address);
    formData.append('phone_number', this.userObj.phone_number);
    this.userService.updateProfile(formData).subscribe((res) => {
      this.loading = false;
      if (res.status) {
        this.messSuccess = 'Cập nhật tài khoản thành công!';
        this.storeService.setUser(res.data);
      } else {
        this.messError = res.message;
      }
    });
  }
}
