import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ArticleService } from '../../services/article.service';
import { King } from '../../models/article.model';

declare var bootstrap: any;

@Component({
  selector: 'app-cac-vi-vua',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cac-vi-vua.component.html',
  styleUrl: './cac-vi-vua.component.css'
})
export class CacViVuaComponent implements OnInit {
  kings: King[] = [];
  filteredKings: King[] = [];
  selectedFilter = 'all';
  selectedKing: King | null = null;
  current3DModel: SafeResourceUrl | null = null;

  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadKings();
  }

  loadKings(): void {
    this.articleService.getKings().subscribe(kings => {
      this.kings = kings;
      this.filteredKings = kings;
    });
  }

  filterKings(filter: string): void {
    this.selectedFilter = filter;
    
    switch (filter) {
      case 'early':
        // First 3 kings (founding period)
        this.filteredKings = this.kings.slice(0, 3);
        break;
      case 'golden':
        // Middle period kings
        this.filteredKings = this.kings.filter(king => 
          king.reignPeriod.includes('1054') || 
          king.reignPeriod.includes('1072') ||
          king.reignPeriod.includes('1127')
        );
        break;
      default:
        this.filteredKings = this.kings;
        break;
    }
  }

  viewKingDetail(king: King): void {
    this.selectedKing = king;
    const modal = new bootstrap.Modal(document.getElementById('kingDetailModal'));
    modal.show();
  }

  view3DModel(sketchfabId: string): void {
    // Create Sketchfab embed URL
    const embedUrl = `https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1`;
    this.current3DModel = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('modelViewerModal'));
    modal.show();
    
    // Close king detail modal if open
    const kingModal = bootstrap.Modal.getInstance(document.getElementById('kingDetailModal'));
    if (kingModal) {
      kingModal.hide();
    }
  }
}