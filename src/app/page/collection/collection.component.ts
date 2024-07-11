import { Component } from '@angular/core';
import {
  FilterTourModel,
  MetaResponse,
  ProvinceModel,
  TourModel,
} from '../../core/models/API.Model';
import { TourService } from '../../core/services/tour.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';
import { FormsModule } from '@angular/forms';

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
  
  totalPage: number[] = [];

  dataFilter:FilterTourModel = new FilterTourModel()


  provinces: ProvinceModel[] = [new ProvinceModel()];
  listTours: TourModel[] = [new TourModel()];
  meta: MetaResponse = new MetaResponse();
 

  
  constructor(private TourService: TourService,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       if(params['type']){
        this.dataFilter.type =params['type']
       }
       if(params['start']){
        this.dataFilter.province_start_id =params['start']
       }
       if(params['end']){
        this.dataFilter.province_end_id =params['end']
       }
       if(params['date']){
        this.dataFilter.date_start =params['date']
       }
       if(params['location']){
        this.dataFilter.province_end_id =params['location']
       }
       this.getTours();

    });


    this.TourService.getAllProvince().subscribe((res) => {
      if (res.status) {
        this.provinces = res.data;
      }
    });
  }
  getTours(): void {
    this.TourService.filterTours(this.dataFilter).subscribe((res) => {
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
    this.dataFilter.page = page;
    this.getTours();
  }
  sort(): void {
    this.dataFilter.page = 1;
    this.getTours();
  }
  sortSelect(): void {
    this.dataFilter.page = 1;
    this.getTours()
    
  }

  resetFilter():void{
    this.dataFilter = new FilterTourModel()
    this.dataFilter.page = 1;
    this.getTours();
  }
 
}
