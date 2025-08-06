import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ArticleService } from '../../services/article.service';
import { King, VuaData } from '../../models/article.model';
import { DataService } from '../../services/data.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cac-vi-vua',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cac-vi-vua.component.html',
  styleUrl: './cac-vi-vua.component.css'
})
export class CacViVuaComponent implements OnInit {
  kings: King[] = [];
  filteredKings: VuaData[] = []; // Sử dụng VuaData interface
  selectedFilter = 'all';
  selectedKing: King | null = null;
  current3DModel: SafeResourceUrl | null = null;
  currentVuaName: string = ''; // Thêm property để lưu tên vị vua hiện tại
  
  // Dữ liệu từ JSON
  triDaiLyData: any = null;
  vuaList: VuaData[] = []; // Sử dụng VuaData interface

  constructor(
    private articleService: ArticleService,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadKings();
    this.loadDataFromJson();
  }

  loadKings(): void {
    this.articleService.getKings().subscribe(kings => {
      this.kings = kings;
      // Không cần gán filteredKings ở đây nữa vì sẽ dùng dữ liệu từ JSON
    });
  }

  loadDataFromJson(): void {
    this.dataService.getTriDaiLyData().subscribe({
      next: (data) => {
        if (data && data.triDaiLy) {
          this.triDaiLyData = data.triDaiLy;
          this.vuaList = data.triDaiLy.cacViVua || [];
          // Thêm đường dẫn hình ảnh cho từng vị vua
          this.vuaList.forEach(vua => {
            vua.imageUrl = this.getVuaImageUrl(vua.ten);
          });
          // Khởi tạo filteredKings với tất cả vua
          this.filteredKings = [...this.vuaList];
          console.log('Loaded vua data:', this.vuaList);
        }
      },
      error: (error) => {
        console.error('Error loading tri dai ly data:', error);
      }
    });
  }

  // Method để lấy đường dẫn hình ảnh cho từng vị vua
  getVuaImageUrl(tenVua: string): string {
    const imageMap: { [key: string]: string } = {
      'Lý Thái Tổ': 'assets/img/ly-thai-to-1.jpeg',
      'Lý Thái Tông': 'assets/img/ly-thai-tong-1.jpg',
      'Lý Thánh Tông': 'assets/img/ly-thanh-tong-1.JPG',
      'Lý Nhân Tông': 'assets/img/ly-nhan-tong-1.JPG',
      'Lý Thần Tông': 'assets/img/ly-than-tong-1.jpg',
      'Lý Anh Tông': 'assets/img/ly-anh-tong-1.jpg',
      'Lý Cao Tông': 'assets/img/ly-cao-tong-1.jpg',
      'Lý Huệ Tông': 'assets/img/ly-hue-tong-1.jpg', // Cần thêm hình ảnh
      'Lý Chiêu Hoàng': 'assets/img/ly-chieu-hoang-1.jpg'
    };
    
    return imageMap[tenVua] || 'assets/img/user-crown.png';
  }

  // Method xử lý lỗi hình ảnh
  onImageError(event: any): void {
    event.target.src = 'assets/img/user-crown.png';
  }

  // Method xem chi tiết vị vua
  viewVuaDetail(vua: VuaData): void {
    this.selectedKing = {
      id: vua.id?.toString() || '0',
      name: vua.ten,
      reignPeriod: vua.thoiGianTriVi,
      birthYear: vua.ngaySinh ? parseInt(vua.ngaySinh.split('/')[2]) : undefined,
      deathYear: vua.ngayMat ? parseInt(vua.ngayMat.split('/')[2]) : undefined,
      biography: vua.thanThe,
      achievements: vua.thanhTuu,
      imageUrl: vua.imageUrl || '',
      sketchfabId: vua.sketchfabId || undefined,
      // Map các thuộc tính mới
      tenThat: vua.tenThat,
      tuoiTho: vua.tuoiTho,
      noiSinh: vua.noiSinh,
      nienHieu: vua.nienHieu, // Đổi từ niênHiệu thành nienHieu
      thongTinChiTiet: vua.thongTinChiTiet
    };
    setTimeout(() => {
      if (this.isModalExists('kingDetailModal')) {
        this.showModalSafely('kingDetailModal');
      } else {
        console.error('Modal kingDetailModal still not found after DOM update');
      }
    }, 0);
  }

  // Method tính tuổi thọ
  calculateAge(birthYear: any, deathYear: any): string {
    if (birthYear && deathYear) {
      const birth = Number(birthYear);
      const death = Number(deathYear);
      if (!isNaN(birth) && !isNaN(death)) {
        return (death - birth) + ' tuổi';
      }
    }
    return 'Không rõ';
  }

  filterKings(filter: string): void {
    this.selectedFilter = filter;
    
    switch (filter) {
      case 'early':
        // Thời kỳ đầu: Lý Thái Tổ, Lý Thái Tông, Lý Thánh Tông (1009-1072)
        this.filteredKings = this.vuaList.filter(vua => {
          const tenVua = vua.ten;
          return tenVua === 'Lý Thái Tổ' || 
                 tenVua === 'Lý Thái Tông' || 
                 tenVua === 'Lý Thánh Tông';
        });
        break;
      case 'golden':
        // Thời kỳ hoàng kim: Lý Nhân Tông, Lý Thần Tông, Lý Anh Tông (1072-1175)
        this.filteredKings = this.vuaList.filter(vua => {
          const tenVua = vua.ten;
          return tenVua === 'Lý Nhân Tông' || 
                 tenVua === 'Lý Thần Tông' || 
                 tenVua === 'Lý Anh Tông';
        });
        break;
      case 'late':
        // Thời kỳ cuối: Lý Cao Tông, Lý Huệ Tông, Lý Chiêu Hoàng (1175-1225)
        this.filteredKings = this.vuaList.filter(vua => {
          const tenVua = vua.ten;
          return tenVua === 'Lý Cao Tông' || 
                 tenVua === 'Lý Huệ Tông' || 
                 tenVua === 'Lý Chiêu Hoàng';
        });
        break;
      default:
        // Tất cả các vị vua
        this.filteredKings = this.vuaList;
        break;
    }
    
    console.log(`Filtered ${this.filteredKings.length} kings with filter: ${filter}`);
  }

  viewKingDetail(king: King): void {
    this.selectedKing = king;
    
    // Đợi DOM cập nhật trước khi hiển thị modal
    setTimeout(() => {
      this.showModalSafely('kingDetailModal');
    }, 0);
  }

  // Method để lấy Sketchfab ID cho từng vị vua
  getVuaSketchfabId(tenVua: string): string | null {
    const sketchfabMap: { [key: string]: string } = {
      'Lý Thái Tổ': '995d4bf0c8d34bb583232f8fa5e5279f', // Emperor's Portrait
      'Lý Thái Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Thánh Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Nhân Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Thần Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Anh Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Cao Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Huệ Tông': '995d4bf0c8d34bb583232f8fa5e5279f',
      'Lý Chiêu Hoàng': '995d4bf0c8d34bb583232f8fa5e5279f'
    };
    
    return sketchfabMap[tenVua] || null;
  }

  view3DModel(tenVua: string): void {
    const sketchfabId = this.getVuaSketchfabId(tenVua);
    
    if (!sketchfabId) {
      console.warn('Không tìm thấy model 3D cho vị vua:', tenVua);
      return;
    }

    // Create Sketchfab embed URL với các tham số tối ưu
    const embedUrl = `https://sketchfab.com/models/${sketchfabId}/embed?autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1&ui_ar=1&ui_help=1&ui_settings=1&ui_vr=1&ui_fullscreen=1&ui_animations=1&ui_annotations=1&ui_loading=1&ui_theme=dark`;
    
    this.current3DModel = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    this.currentVuaName = tenVua; // Lưu tên vị vua hiện tại
    
    // Đóng modal chi tiết trước khi mở modal 3D
    try {
      const kingModalElement = document.getElementById('kingDetailModal');
      if (kingModalElement) {
        const kingModal = bootstrap.Modal.getInstance(kingModalElement);
        if (kingModal) {
          kingModal.hide();
        }
      }
    } catch (error) {
      console.error('Error closing king detail modal:', error);
    }
    
    // Sử dụng helper method an toàn
    this.showModalSafely('modelViewerModal');
  }

  // Helper method để kiểm tra modal có tồn tại không
  private isModalExists(modalId: string): boolean {
    const modalElement = document.getElementById(modalId);
    return modalElement !== null;
  }

  // Helper method để tạo modal an toàn
  private createModalSafely(modalId: string): any {
    try {
      if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap is not loaded');
        return null;
      }
      
      const modalElement = document.getElementById(modalId);
      if (!modalElement) {
        console.error(`Modal element with id '${modalId}' not found`);
        return null;
      }
      
      return new bootstrap.Modal(modalElement);
    } catch (error) {
      console.error(`Error creating modal for '${modalId}':`, error);
      return null;
    }
  }

  // Helper method để hiển thị modal an toàn
  private showModalSafely(modalId: string): boolean {
    const modal = this.createModalSafely(modalId);
    if (modal) {
      try {
        modal.show();
        return true;
      } catch (error) {
        console.error(`Error showing modal '${modalId}':`, error);
        return false;
      }
    } else {
      // Retry logic nếu modal chưa được tạo
      console.warn(`Modal '${modalId}' not found, retrying in 100ms...`);
      setTimeout(() => {
        const retryModal = this.createModalSafely(modalId);
        if (retryModal) {
          try {
            retryModal.show();
          } catch (error) {
            console.error(`Error showing modal '${modalId}' on retry:`, error);
          }
        } else {
          console.error(`Modal '${modalId}' still not found after retry`);
        }
      }, 100);
      return false;
    }
  }
}