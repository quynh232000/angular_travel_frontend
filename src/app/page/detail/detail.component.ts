import { Component, OnInit } from '@angular/core';
import { TourModel } from '../../core/models/API.Model';
import { TourService } from '../../core/services/tour.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { FormatpricePipe } from '../../shared/pipes/formatprice.pipe';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, FormatdatePipe, FormatpricePipe, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  tourdetail: TourModel = new TourModel();
  private slugSubscription: Subscription | null = null;
  isLogin: boolean = false;
  tourSeens: TourModel[] = [];
  constructor(
    private TourService: TourService,
    private router: ActivatedRoute,
    private route: Router,
    private title: Title,
    private StoreService: StoreService
  ) {}

  ngOnInit(): void {
    this.StoreService.login$.subscribe((login) => {
      if (login) {
        this.isLogin = true;
      }
    });
    this.StoreService.suggesTours$.subscribe((suggesTours) => {
      this.tourSeens = suggesTours;
    });

    this.slugSubscription = this.router.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.TourService.getDetailTour(slug).subscribe((res) => {
          if (res.status) {
            this.tourdetail = res.data;
            this.title.setTitle(res.data.title);

            // set tour seen
            this.StoreService.setSuggessTours(res.data);
          } else {
            console.log(res);
            this.route.navigateByUrl('/error');
          }
        });
      }
    });
  }
  ngOndestroy() {
    if (this.slugSubscription) {
      this.slugSubscription.unsubscribe();
    }
  }
  likeTour(id: number) {
    this.TourService.likeTour(id).subscribe((res) => {
      if (res.status) {
        if (this.tourdetail.is_like) {
          this.tourdetail.is_like = false;
          this.tourdetail.like_count--;
        } else {
          this.tourdetail.is_like = true;
          this.tourdetail.like_count++;
        }
      }
    });
  }
}
