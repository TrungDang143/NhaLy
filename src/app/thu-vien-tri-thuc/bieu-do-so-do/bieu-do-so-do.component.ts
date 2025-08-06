import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

declare var bootstrap: any;

interface MapData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'territory' | 'architecture' | 'battle';
  period: string;
  scale?: string;
  features?: string[];
  has3D?: boolean;
}

@Component({
  selector: 'app-bieu-do-so-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bieu-do-so-do.component.html',
  styleUrl: './bieu-do-so-do.component.css'
})
export class BieuDoSoDoComponent implements OnInit {
  maps: MapData[] = [];
  filteredMaps: MapData[] = [];
  selectedCategory = 'all';
  selectedMap: MapData | null = null;

  // Dữ liệu từ JSON
  triDaiLyData: any = null;
  suKienList: any[] = [];
  diTichList: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadMaps();
    this.loadDataFromJson();
  }

  loadMaps(): void {
    this.maps = [
      {
        id: '1',
        title: 'Bản đồ lãnh thổ triều Lý thế kỷ XI',
        description: 'Mô tả lãnh thổ Đại Việt dưới thời Lý Thái Tổ, bao gồm các vùng đất mới được mở rộng.',
        imageUrl: 'assets/img/service-3.jpg',
        category: 'territory',
        period: '1009-1054',
        scale: '1:500,000',
        features: [
          'Ranh giới với Trung Quốc phía Bắc',
          'Vùng đồng bằng sông Hồng',
          'Các tỉnh phía Nam mới chiếm được',
          'Đường giao thương chính'
        ],
        has3D: true
      },
      {
        id: '2',
        title: 'Sơ đồ kiến trúc Hoàng thành Thăng Long',
        description: 'Bản vẽ chi tiết về cấu trúc và bố cục của Hoàng thành Thăng Long thời Lý.',
        imageUrl: 'assets/img/carousel-1.jpg',
        category: 'architecture',
        period: '1010-1225',
        scale: '1:1,000',
        features: [
          'Cung Càn Nguyên',
          'Điện Thiên An',
          'Hậu viện',
          'Khu vực quan lại',
          'Hệ thống thành lũy'
        ],
        has3D: true
      },
      {
        id: '3',
        title: 'Bản đồ trận Như Nguyệt Giang (1077)',
        description: 'Sơ đồ chiến thuật trong trận đánh nổi tiếng giữa quân Lý và quân Tống.',
        imageUrl: 'assets/img/carousel-2.jpg',
        category: 'battle',
        period: '1077',
        features: [
          'Vị trí đóng quân của hai bên',
          'Đường tiến công chính',
          'Địa hình sông nước',
          'Chiến thuật mai phục'
        ],
        has3D: false
      },
      {
        id: '4',
        title: 'Sơ đồ Văn Miếu - Quốc Tử Giám',
        description: 'Bản vẽ kiến trúc của ngôi trường đại học đầu tiên của Việt Nam.',
        imageUrl: 'assets/img/service-6.jpg',
        category: 'architecture',
        period: '1070-1225',
        scale: '1:500',
        features: [
          'Khu thờ Khổng Tử',
          'Các phòng học',
          'Khu ký túc xá',
          'Vườn cây và ao hồ'
        ],
        has3D: true
      },
      {
        id: '5',
        title: 'Bản đồ mạng lưới giao thông thời Lý',
        description: 'Hệ thống đường sá và thủy lộ kết nối các vùng trong nước thời triều Lý.',
        imageUrl: 'assets/img/service-4.jpg',
        category: 'territory',
        period: '1009-1225',
        scale: '1:1,000,000',
        features: [
          'Đường quan lộ chính',
          'Hệ thống thủy lộ',
          'Các trạm dừng chân',
          'Cầu cống quan trọng'
        ],
        has3D: false
      }
    ];
    
    this.filteredMaps = this.maps;
  }

  loadDataFromJson(): void {
    // Load dữ liệu tổng quan
    this.dataService.getTriDaiLyData().subscribe({
      next: (data) => {
        if (data && data.triDaiLy) {
          this.triDaiLyData = data.triDaiLy;
          console.log('Loaded tri dai ly data:', this.triDaiLyData);
        }
      },
      error: (error) => {
        console.error('Error loading tri dai ly data:', error);
      }
    });

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

    // Load di tích lịch sử
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

  filterMaps(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredMaps = this.maps;
    } else {
      this.filteredMaps = this.maps.filter(map => map.category === category);
    }
  }

  getCategoryName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'territory': 'Lãnh thổ',
      'architecture': 'Kiến trúc',
      'battle': 'Trận địa'
    };
    return categoryMap[category] || category;
  }

  getCategoryBadgeClass(category: string): string {
    const classMap: { [key: string]: string } = {
      'territory': 'bg-primary',
      'architecture': 'bg-success',
      'battle': 'bg-warning text-dark'
    };
    return classMap[category] || 'bg-secondary';
  }

  viewMapDetail(map: MapData): void {
    this.selectedMap = map;
    const modal = new bootstrap.Modal(document.getElementById('mapDetailModal'));
    modal.show();
  }

  view3DModel(map: MapData): void {
    alert(`Chức năng xem mô hình 3D cho "${map.title}" sẽ được phát triển trong phiên bản tiếp theo`);
  }



  openInteractiveMap(): void {
    alert('Chức năng bản đồ tương tác sẽ được phát triển trong phiên bản tiếp theo');
  }

  viewVRTour(): void {
    alert('Chức năng tour VR sẽ được phát triển trong phiên bản tiếp theo');
  }

  explore3D(): void {
    alert('Chức năng khám phá 3D sẽ được phát triển trong phiên bản tiếp theo');
  }

  startVR(): void {
    alert('Chức năng VR sẽ được phát triển trong phiên bản tiếp theo');
  }

  startAR(): void {
    alert('Chức năng AR sẽ được phát triển trong phiên bản tiếp theo');
  }

  // Map viewer controls
  zoomIn(): void {
    alert('Chức năng phóng to sẽ được phát triển trong phiên bản tiếp theo');
  }

  zoomOut(): void {
    alert('Chức năng thu nhỏ sẽ được phát triển trong phiên bản tiếp theo');
  }

  resetView(): void {
    alert('Chức năng đặt lại view sẽ được phát triển trong phiên bản tiếp theo');
  }

  // Methods cho dữ liệu JSON
  getSuKienByNam(nam: number): any[] {
    return this.suKienList.filter(suKien => suKien.nam === nam);
  }

  getDiTichByViTri(viTri: string): any[] {
    return this.diTichList.filter(diTich => diTich.viTri === viTri);
  }

  getTamQuanSuKien(): any[] {
    return this.suKienList.filter(suKien => suKien.tamQuan);
  }

  getTamQuanDiTich(): any[] {
    return this.diTichList.filter(diTich => diTich.tamQuan);
  }

  getThongTinChung(): any {
    return this.triDaiLyData ? this.triDaiLyData.thongTinChung : null;
  }

  getCacViVua(): any[] {
    return this.triDaiLyData ? this.triDaiLyData.cacViVua : [];
  }
}