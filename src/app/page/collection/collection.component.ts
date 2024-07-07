import { Component } from '@angular/core';
import {
  MetaResponse,
  ProvinceModel,
  TourModel,
} from '../../core/models/API.Model';
import { TourService } from '../../core/services/tour.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormatdatePipe,
    FormatpricePipe,
    FormsModule,
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
})
export class CollectionComponent {
  limit: number = 6;
  page: number = 1;
  totalPage: number[] = [];
  provinces: ProvinceModel[] = [new ProvinceModel()];
  listTours: TourModel[] = [new TourModel()];
  meta: MetaResponse = new MetaResponse();
  sortOption: string = '';
  key: string = '';
  value: string = '';
  // key filter
 
  type: string = '';
  province_start_id: number = 0;
  province_end_id: number = 0;
  number_of_day: string = '';
  tour_pakage: string = '';
  date_start: string = '';
  
  constructor(private TourService: TourService) {}
  ngOnInit(): void {
    this.getTours();
    this.TourService.getAllProvince().subscribe((res) => {
      if (res.status) {
        this.provinces = res.data;
      }
    });
  }
  getTours(result: string = this.value): void {
    this.TourService.getAllTours(
      this.page,
      this.limit,
      this.key,
      result,
      this.sortOption
    ).subscribe((res) => {
      if (res.status) {
        this.listTours = res.data;
        this.meta = res.meta;
      }
    });
  }
  get pages(): number[] {
    const totalPages = Math.ceil(this.meta.total / this.meta.per_page);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  changePage(page: number): void {
    this.page = page;
    this.getTours();
  }
  sort(): void {
    this.page = 1;
    this.getTours();
  }
  sortSelect(key: string): void {
    this.key = key;
    this.page = 1;
    switch (key) {
      case 'number_of_day':
        this.value = this.number_of_day + '';
        this.getTours(this.number_of_day + '');
        break;
      case 'tour_pakage':
        this.value = this.tour_pakage;
        this.getTours(this.tour_pakage);
        break;
      case 'date_start':
        this.value = this.date_start + '';
        this.getTours(this.date_start);
        break;
      case 'type':
        this.value = this.type;
        this.getTours(this.type);
        break;
      case 'province_start_id':
        this.value = this.province_start_id + '';
        this.getTours(this.province_start_id + '');
        break;
      case 'province_end_id':
        this.value = this.province_end_id + '';
        this.getTours(this.province_end_id + '');
        break;

      default:
        this.getTours();

        break;
    }
    this.resetkey(key)
  }

  resetkey(keyactive:string|number){
    if(keyactive!='type') this.type=""
    if(keyactive!='province_start_id') this.province_start_id=0
    if(keyactive!='province_end_id') this.province_end_id=0
    if(keyactive!='number_of_day') this.number_of_day=""
    if(keyactive!='tour_pakage') this.tour_pakage=""
    if(keyactive!='date_start') this.date_start=""
  }

 
}
