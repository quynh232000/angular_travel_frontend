import { Component } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { NewsModel } from '../../core/models/API.Model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatdatePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  news: NewsModel[] = [];
  // slug: string = '';
  newsDetail: NewsModel = new NewsModel();
  private routeSubscription: Subscription| null = null;
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router:Router,
    private title:Title
  ) {}
  ngOnInit() {
    // get news detail
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.newsService.getNewsDetail(slug).subscribe((res) => {
          if (res.status) {
            this.newsDetail = res.data;
            this.title.setTitle(this.newsDetail.title);
          }else{
            this.router.navigate(['/error']);
          }
        });
      }
    });

    // get list news
    this.newsService.getNews().subscribe((res) => {
      if (res.status) {
        this.news = res.data;
      }
    });
  }
  ngOndestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
