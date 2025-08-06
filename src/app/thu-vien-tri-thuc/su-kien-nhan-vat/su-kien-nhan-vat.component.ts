import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';
import { Article, HistoricalEvent, King } from '../../models/article.model';
import { DataService } from '../../services/data.service';

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

  // Dữ liệu từ JSON
  suKienList: any[] = [];
  nhanVatList: any[] = [];
  selectedSuKien: any = null;
  selectedNhanVat: any = null;

  constructor(
    private articleService: ArticleService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadDataFromJson();
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

  loadDataFromJson(): void {
    // Load sự kiện lịch sử
    this.dataService.getSuKienLichSuData().subscribe({
      next: (data) => {
        if (data && data.suKienLichSu) {
          this.suKienList = data.suKienLichSu;
          console.log('Loaded su kien data:', this.suKienList);
        }
      },
      error: (error) => {
        console.error('Error loading su kien data:', error);
      }
    });

    // Load nhân vật lịch sử
    this.dataService.getNhanVatLichSuData().subscribe({
      next: (data) => {
        if (data && data.nhanVatLichSu) {
          this.nhanVatList = data.nhanVatLichSu;
          console.log('Loaded nhan vat data:', this.nhanVatList);
        }
      },
      error: (error) => {
        console.error('Error loading nhan vat data:', error);
      }
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

  // Methods cho dữ liệu JSON
  viewSuKienDetail(suKien: any): void {
    this.selectedSuKien = suKien;
    const modal = new bootstrap.Modal(document.getElementById('suKienDetailModal'));
    modal.show();
  }

  viewNhanVatDetail(nhanVat: any): void {
    this.selectedNhanVat = nhanVat;
    const modal = new bootstrap.Modal(document.getElementById('nhanVatDetailModal'));
    modal.show();
  }

  getSuKienByVua(viVua: string): any[] {
    return this.suKienList.filter(suKien => suKien.viVua === viVua);
  }

  getNhanVatByViTri(viTri: string): any[] {
    return this.nhanVatList.filter(nhanVat => nhanVat.viTri.includes(viTri));
  }

  getTamQuanSuKien(): any[] {
    return this.suKienList.filter(suKien => suKien.tamQuan);
  }

  getTamQuanNhanVat(): any[] {
    return this.nhanVatList.filter(nhanVat => nhanVat.tamQuan);
  }
}