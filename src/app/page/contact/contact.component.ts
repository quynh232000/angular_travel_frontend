import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    name:string =""
    email:string =""
    phone:string =""
    address:string =""
    title:string =""
    content:string =""

    mess_error:string =""
    mess_success:string =""

    onSubmit(){
        this.mess_error = ""
        if(this.name =="" || this.email =="" || this.phone =="" || this.title =="" || this.content==""){
          this.mess_error = "Vui lòng nhập đầy đầy thông tin!"
          return
        }
        this.mess_success = "Thông tin của bạn đã được gửi đi!"
    }

}
