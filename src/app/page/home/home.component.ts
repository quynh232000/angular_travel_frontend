import { Component, AfterViewInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { CountryModel, NewsModel, ProvinceModel, TourModel } from '../../core/models/API.Model';
import { NewsService } from '../../core/services/news.service';
import { CommonModule } from '@angular/common';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { TourService } from '../../core/services/tour.service';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormatdatePipe,FormatpricePipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  swipper1!: Swiper;
  swipper2!: Swiper;

  news: NewsModel[] = [new NewsModel()];
  tourInside: TourModel[] = [new TourModel()];
  tourOutside: TourModel[] = [new TourModel()];
  hotels: TourModel[] = [new TourModel()];
  provinces: ProvinceModel[] = [new ProvinceModel()]
  locations:ProvinceModel[] = [new ProvinceModel()]

  // filter
  type:string =""
  province_start_id:string=""
  province_end_id:string=""
  date_start:string=""


  constructor(
    private NewsService: NewsService,
    private TourService: TourService,
    private route:Router
  ) {}

  ngOnInit(): void {
    // get all province
    this.TourService.getAllProvince().subscribe((res) => {
      if (res.status) {
       this.provinces = res.data;
       this.locations = res.data.filter((item:ProvinceModel)=>item.type.includes('Thành phố'))
      
      }
    });
    // get tour inside
    this.TourService.getAllTours(1, 4, 'type', 'inside').subscribe((res) => {
      if (res.status) {
        this.tourInside = res.data;
      }
    });
    // get tour inside
    this.TourService.getAllTours(1, 4, 'type', 'ouside').subscribe((res) => {
      if (res.status) {
        this.tourOutside = res.data;
      }
    });
    // get tour inside
    this.TourService.getAllTours(1, 4, 'category', 'hotel').subscribe((res) => {
      if (res.status) {
        this.hotels = res.data;
      }
    });
    // get news
    this.NewsService.getNews(1, 3).subscribe((res) => {
      if (res.status) {
        this.news = res.data;
      }
    });
  }
  ngAfterViewInit() {
    this.swipper1 = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });

    this.swipper2 = new Swiper('.swiper-uudai', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        840: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
      },
    });
  }
  handleFilter():void{
    if(this.type !="" && this.province_start_id !="" && this.province_end_id !="" && this.date_start !=""){
      this.route.navigate(['/collection'], { queryParams: { type: this.type,start:this.province_start_id,end:this.province_end_id,date:this.date_start} })
    }
  }
}
