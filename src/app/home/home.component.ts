import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Dữ liệu tổng quan từ JSON
  triDaiLyData: any = null;
  suKienList: any[] = [];
  diTichList: any[] = [];
  nhanVatList: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadDataFromJson();
  }

  loadDataFromJson(): void {
    // Load tất cả dữ liệu
    this.dataService.loadAllData().subscribe({
      next: (data) => {
        if (data.triDaiLy) {
          this.triDaiLyData = data.triDaiLy;
        }
        if (data.suKienLichSu) {
          this.suKienList = data.suKienLichSu.suKienLichSu || [];
        }
        if (data.diTichLichSu) {
          this.diTichList = data.diTichLichSu.diTichLichSu || [];
        }
        if (data.nhanVatLichSu) {
          this.nhanVatList = data.nhanVatLichSu.nhanVatLichSu || [];
        }
        console.log('Loaded all data for home component');
      },
      error: (error) => {
        console.error('Error loading data for home component:', error);
      }
    });
  }

  getThongTinChung(): any {
    return this.triDaiLyData ? this.triDaiLyData.thongTinChung : null;
  }

  getCacViVua(): any[] {
    return this.triDaiLyData ? this.triDaiLyData.cacViVua : [];
  }

  getTamQuanSuKien(): any[] {
    return this.suKienList.filter(suKien => suKien.tamQuan);
  }

  getTamQuanDiTich(): any[] {
    return this.diTichList.filter(diTich => diTich.tamQuan);
  }

  getTamQuanNhanVat(): any[] {
    return this.nhanVatList.filter(nhanVat => nhanVat.tamQuan);
  }
}
