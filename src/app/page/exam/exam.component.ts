import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ExamService } from '../../core/services/exam.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  search: string = '';
  data: any[] = [];
  products: any[] = [];
  api: string = 'http://localhost:4200/api/products';
  sort: string = '';
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.getData();
  }

  getData(filter?: string) {
    filter = filter || '';
    this.http.get(this.api + filter).subscribe((data: any) => {
      this.products = data;
      this.data = data;
    });
  }
  handleSearch() {
    this.products = this.data.filter((product) =>
      product.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
    );
  }
  handleSort() {
    switch (this.sort) {
      case 'price':
        this.products = this.data.sort((a, b) => a.price - b.price);
        break;
      case '-price':
        this.products = this.data.sort((a, b) => b.price - a.price);
        break;
     

      default:
        this.products = this.data;
        break;
    }
  }
}
