import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ArticleService } from '../../services/article.service';
import { Article, King, HistoricalEvent, Document } from '../../models/article.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab = 'overview';
  articles: Article[] = [];
  kings: King[] = [];
  events: HistoricalEvent[] = [];
  documents: Document[] = [];

  constructor(
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles;
    });

    this.articleService.getKings().subscribe(kings => {
      this.kings = kings;
    });

    this.articleService.getEvents().subscribe(events => {
      this.events = events;
    });

    this.articleService.getDocuments().subscribe(documents => {
      this.documents = documents;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  logout(): void {
    this.authService.logout();
  }

  getFeaturedArticlesCount(): number {
    return this.articles.filter(article => article.featured).length;
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

  getDocumentTypeName(type: string): string {
    const typeMap: { [key: string]: string } = {
      'edict': 'Chiếu chỉ',
      'poem': 'Thơ ca',
      'letter': 'Thư tín',
      'chronicle': 'Biên niên'
    };
    return typeMap[type] || type;
  }

  getDocumentTypeBadgeClass(type: string): string {
    const classMap: { [key: string]: string } = {
      'edict': 'bg-warning',
      'poem': 'bg-info',
      'letter': 'bg-success',
      'chronicle': 'bg-primary'
    };
    return classMap[type] || 'bg-secondary';
  }

  openArticleModal(): void {
    // TODO: Implement article creation modal
    alert('Chức năng thêm bài viết sẽ được phát triển trong phiên bản tiếp theo');
  }

  editArticle(article: Article): void {
    // TODO: Implement article editing
    alert('Chức năng chỉnh sửa bài viết sẽ được phát triển trong phiên bản tiếp theo');
  }

  deleteArticle(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      this.articleService.deleteArticle(id);
    }
  }

  viewDocument(document: Document): void {
    // TODO: Implement document viewer
    alert(`Xem văn bản: ${document.title}\n\nNội dung:\n${document.content}`);
  }
}