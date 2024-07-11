import { Component } from '@angular/core';
import { NewsModel } from '../../core/models/API.Model';
import { NewsService } from '../../core/services/news.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatdatePipe } from '../../shared/pipes/formatdate.pipe';

@Component({
  selector: 'app-newslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatdatePipe],
  templateUrl: './newslist.component.html',
  styleUrl: './newslist.component.css',
})
export class NewslistComponent {
  newsList: NewsModel[] = [];
  constructor(private NewsService: NewsService, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Quin - Tin tức');
    this.NewsService.getNews().subscribe((res) => {
      if (res.status) {
        this.newsList = res.data;
      }
    });
  }
}
