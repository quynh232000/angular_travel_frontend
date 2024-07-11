import { Component } from '@angular/core';
import { TourService } from '../../core/services/tour.service';
import { OrderHis } from '../../core/models/API.Model';
import { CommonModule } from '@angular/common';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';

@Component({
  selector: 'app-orderhistroy',
  standalone: true,
  imports: [CommonModule,FormatdatePipe,FormatpricePipe],
  templateUrl: './orderhistroy.component.html',
  styleUrl: './orderhistroy.component.css'
})
export class OrderhistroyComponent {

 listOrders:OrderHis[] =[]
  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.tourService.getOrderHistory().subscribe(res=>{
      if(res.status){
        this.listOrders = res.data
      }
    })
  }
}
