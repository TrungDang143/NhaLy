import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';
import { Article, HistoricalEvent, King } from '../../models/article.model';

declare var bootstrap: any;

@Component({
  selector: 'app-su-kien-nhan-vat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './su-kien-nhan-vat.component.html',
  styleUrl: './su-kien-nhan-vat.component.css'
})
export class SuKienNhanVatComponent implements OnInit {
  events: HistoricalEvent[] = [];
  featuredArticles: Article[] = [];
  kings: King[] = [];
  selectedEvent: HistoricalEvent | null = null;
  selectedArticle: Article | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.articleService.getEvents().subscribe(events => {
      this.events = events;
    });

    this.articleService.getArticles().subscribe(articles => {
      this.featuredArticles = articles.filter(article => 
        article.category === 'events' || article.featured
      );
    });

    this.articleService.getKings().subscribe(kings => {
      this.kings = kings;
    });
  }

  getCategoryName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'kings': 'Các vị vua',
      'events': 'Sự kiện',
      'documents': 'Văn bản',
      'maps': 'Bản đồ',
      'culture': 'Văn hóa',
      'archaeology': 'Khảo cổ'
    };
    return categoryMap[category] || category;
  }

  getCategoryBadgeClass(category: string): string {
    const classMap: { [key: string]: string } = {
      'kings': 'bg-warning',
      'events': 'bg-info',
      'documents': 'bg-success',
      'maps': 'bg-primary',
      'culture': 'bg-secondary',
      'archaeology': 'bg-dark'
    };
    return classMap[category] || 'bg-secondary';
  }

  viewEventDetail(event: HistoricalEvent): void {
    this.selectedEvent = event;
    const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
    modal.show();
  }

  viewArticleDetail(article: Article): void {
    this.selectedArticle = article;
    const modal = new bootstrap.Modal(document.getElementById('articleDetailModal'));
    modal.show();
  }

  getKingName(kingId: string): string {
    const king = this.kings.find(k => k.id === kingId);
    return king ? king.name : 'Không rõ';
  }

  view3DModel(sketchfabId: string): void {
    // TODO: Implement 3D model viewer
    alert('Chức năng xem mô hình 3D sẽ được phát triển trong phiên bản tiếp theo');
  }

  openInteractiveMap(): void {
    // TODO: Implement interactive map
    alert('Chức năng bản đồ tương tác sẽ được phát triển trong phiên bản tiếp theo');
  }

  openTimeline(): void {
    // TODO: Implement timeline viewer
    alert('Chức năng dòng thời gian sẽ được phát triển trong phiên bản tiếp theo');
  }
}