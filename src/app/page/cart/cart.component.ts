import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StoreService } from '../../core/services/store.service';
import { TourModel } from '../../core/models/API.Model';
import { RouterLink } from '@angular/router';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,FormatpricePipe,FormatdatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  listTour:TourModel[] = [];
  constructor(private StoreService: StoreService){}
  ngOnInit(){
    this.StoreService.compareTours$.subscribe((data) => {
      this.listTour =data
    });
  }
  remove(tour:TourModel){
    this.StoreService.removeCompareTours(tour);
  }
}
