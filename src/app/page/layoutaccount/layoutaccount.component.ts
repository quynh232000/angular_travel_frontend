import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layoutaccount',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet],
  templateUrl: './layoutaccount.component.html',
  styleUrl: './layoutaccount.component.css'
})
export class LayoutaccountComponent {

}
