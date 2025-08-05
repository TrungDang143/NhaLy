import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SafePipe],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.css'
})
export class DetailViewComponent implements OnInit {
  item: Article | null = null;
  relatedItems: Article[] = [];
  rating: number = 0;
  hoverRating: number = 0;
  ratingText: string = 'Chưa đánh giá';
  isSubmitting: boolean = false;
  feedbackForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      type: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      anonymous: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadItem(id);
        this.loadRelatedItems(id);
      }
    });
  }

  loadItem(id: string): void {
    this.articleService.getArticleById(id).subscribe(
      article => {
        this.item = article;
        if (!this.item) {
          this.router.navigate(['/page-404']);
        }
      },
      error => {
        console.error('Error loading article:', error);
        this.router.navigate(['/page-404']);
      }
    );
  }

  loadRelatedItems(currentId: string): void {
    this.articleService.getArticles().subscribe(
      articles => {
        this.relatedItems = articles
          .filter(article => article.id !== currentId)
          .slice(0, 4);
      }
    );
  }

  // Rating methods
  setRating(rating: number): void {
    this.rating = rating;
    this.updateRatingText();
  }

  setHoverRating(rating: number): void {
    this.hoverRating = rating;
  }

  updateRatingText(): void {
    const texts = [
      'Chưa đánh giá',
      'Rất không hài lòng',
      'Không hài lòng',
      'Bình thường',
      'Hài lòng',
      'Rất hài lòng'
    ];
    this.ratingText = texts[this.rating];
  }

  // 3D Model methods
  toggleFullscreen(): void {
    const iframe = document.querySelector('.sketchfab-iframe') as HTMLIFrameElement;
    if (iframe) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframe.requestFullscreen();
      }
    }
  }

  rotateModel(): void {
    // Send message to Sketchfab iframe to rotate model
    const iframe = document.querySelector('.sketchfab-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'rotate',
        angle: 90
      }, '*');
    }
  }

  resetModel(): void {
    // Send message to Sketchfab iframe to reset model
    const iframe = document.querySelector('.sketchfab-iframe') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'reset'
      }, '*');
    }
  }

  // Navigation methods
  navigateToDetail(id: string): void {
    this.router.navigate(['/detail', id]);
  }

  // Share methods
  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.item?.title || '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.item?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnWhatsApp(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.item?.title || '');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Show success message
      alert('Đã sao chép link!');
    });
  }



  // Feedback methods
  submitFeedback(): void {
    if (this.feedbackForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const feedback = {
        ...this.feedbackForm.value,
        articleId: this.item?.id,
        rating: this.rating,
        timestamp: new Date().toISOString()
      };

      // Simulate API call
      setTimeout(() => {
        console.log('Feedback submitted:', feedback);
        this.isSubmitting = false;
        this.feedbackForm.reset();
        this.rating = 0;
        this.updateRatingText();
        
        // Show success message
        alert('Cảm ơn bạn đã góp ý!');
      }, 2000);
    }
  }
}
