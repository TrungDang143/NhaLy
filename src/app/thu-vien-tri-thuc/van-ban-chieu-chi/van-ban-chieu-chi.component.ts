import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';
import { Document } from '../../models/article.model';
import { DataService } from '../../services/data.service';

declare var bootstrap: any;

@Component({
  selector: 'app-van-ban-chieu-chi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './van-ban-chieu-chi.component.html',
  styleUrl: './van-ban-chieu-chi.component.css'
})
export class VanBanChieuChiComponent implements OnInit {
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  selectedType = 'all';
  selectedDocument: Document | null = null;

  // Dữ liệu từ JSON
  diTichList: any[] = [];
  selectedDiTich: any = null;

  constructor(
    private articleService: ArticleService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
    this.loadDataFromJson();
  }

  loadDocuments(): void {
    this.articleService.getDocuments().subscribe(documents => {
      this.documents = documents;
      this.filteredDocuments = documents;
    });
  }

  loadDataFromJson(): void {
    this.dataService.getDiTichLichSuData().subscribe({
      next: (data) => {
        if (data && data.diTichLichSu) {
          this.diTichList = data.diTichLichSu;
          console.log('Loaded di tich data:', this.diTichList);
        }
      },
      error: (error) => {
        console.error('Error loading di tich data:', error);
      }
    });
  }

  filterDocuments(type: string): void {
    this.selectedType = type;
    
    if (type === 'all') {
      this.filteredDocuments = this.documents;
    } else {
      this.filteredDocuments = this.documents.filter(doc => doc.type === type);
    }
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
      'edict': 'bg-warning text-dark',
      'poem': 'bg-info',
      'letter': 'bg-success',
      'chronicle': 'bg-primary'
    };
    return classMap[type] || 'bg-secondary';
  }

  getDocumentTypeIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'edict': 'fas fa-crown',
      'poem': 'fas fa-feather',
      'letter': 'fas fa-envelope',
      'chronicle': 'fas fa-book'
    };
    return iconMap[type] || 'fas fa-file-alt';
  }

  viewDocument(doc: Document): void {
    this.selectedDocument = doc;
    const modalElement = document.getElementById('documentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  formatDocumentContent(content: string): string {
    // Format content for better display
    return content
      .replace(/\n/g, '<br>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><br><\/p>/g, '<br>');
  }



  shareDocument(doc: Document): void {
    if (navigator.share) {
      navigator.share({
        title: doc.title,
        text: doc.description,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      const text = `${doc.title}\n\n${doc.description}\n\n${window.location.href}`;
      navigator.clipboard.writeText(text).then(() => {
        alert('Đã sao chép link chia sẻ vào clipboard!');
      });
    }
  }

  // Methods cho dữ liệu di tích
  viewDiTichDetail(diTich: any): void {
    this.selectedDiTich = diTich;
    const modal = new bootstrap.Modal(document.getElementById('diTichDetailModal'));
    modal.show();
  }

  getDiTichByViTri(viTri: string): any[] {
    return this.diTichList.filter(diTich => diTich.viTri === viTri);
  }

  getTamQuanDiTich(): any[] {
    return this.diTichList.filter(diTich => diTich.tamQuan);
  }

  getDiTichByNam(nam: number): any[] {
    return this.diTichList.filter(diTich => {
      if (typeof diTich.nam === 'number') {
        return diTich.nam === nam;
      }
      return false;
    });
  }
}