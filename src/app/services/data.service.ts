import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface TriDaiLyData {
  triDaiLy: {
    thongTinChung: {
      ten: string;
      tenKhac: string;
      thoiGianTonTai: string;
      soNam: number;
      soDoiVua: number;
      quocHieu: string[];
      kinhDo: string[];
      moTa: string;
    };
    cacViVua: Array<{
      ten: string;
      tenThat: string;
      niênHiệu: string[];
      ngaySinh: string;
      ngayMat: string;
      thoiGianTriVi: string;
      tuoiTho: number;
      noiSinh: string;
      thanThe: string;
      thanhTuu: string[];
      suKienLon: Array<{
        nam: number;
        suKien: string;
        moTa: string;
      }>;
    }>;
    chinhTri: any;
    quanSu: any;
    kinhTe: any;
    vanHoa: any;
    suKienLon: Array<{
      nam: number | string;
      suKien: string;
      moTa: string;
    }>;
    diSan: any;
  };
}

export interface SuKienLichSuData {
  suKienLichSu: Array<{
    nam: number | string;
    suKien: string;
    moTa: string;
    viVua: string;
    tamQuan: boolean;
  }>;
}

export interface DiTichLichSuData {
  diTichLichSu: Array<{
    ten: string;
    viTri: string;
    nam: number | string;
    moTa: string;
    giaTri: string;
    hinhAnh: string;
    tamQuan: boolean;
  }>;
}

export interface NhanVatLichSuData {
  nhanVatLichSu: Array<{
    ten: string;
    hieu: string;
    nam: string;
    viTri: string;
    moTa: string;
    thanhTuu: string[];
    tamQuan: boolean;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  // Đọc dữ liệu tổng quan về triều đại Lý
  getTriDaiLyData(): Observable<TriDaiLyData> {
    return this.http.get<TriDaiLyData>('assets/data/tri-dai-ly-data.json')
      .pipe(
        catchError(error => {
          console.error('Error loading tri-dai-ly-data.json:', error);
          return of(null as any);
        })
      );
  }

  // Đọc dữ liệu sự kiện lịch sử
  getSuKienLichSuData(): Observable<SuKienLichSuData> {
    return this.http.get<SuKienLichSuData>('assets/data/su-kien-lich-su.json')
      .pipe(
        catchError(error => {
          console.error('Error loading su-kien-lich-su.json:', error);
          return of(null as any);
        })
      );
  }

  // Đọc dữ liệu di tích lịch sử
  getDiTichLichSuData(): Observable<DiTichLichSuData> {
    return this.http.get<DiTichLichSuData>('assets/data/di-tich-lich-su.json')
      .pipe(
        catchError(error => {
          console.error('Error loading di-tich-lich-su.json:', error);
          return of(null as any);
        })
      );
  }

  // Đọc dữ liệu nhân vật lịch sử
  getNhanVatLichSuData(): Observable<NhanVatLichSuData> {
    return this.http.get<NhanVatLichSuData>('assets/data/nhan-vat-lich-su.json')
      .pipe(
        catchError(error => {
          console.error('Error loading nhan-vat-lich-su.json:', error);
          return of(null as any);
        })
      );
  }

  // Load tất cả dữ liệu
  loadAllData(): Observable<{
    triDaiLy: TriDaiLyData;
    suKienLichSu: SuKienLichSuData;
    diTichLichSu: DiTichLichSuData;
    nhanVatLichSu: NhanVatLichSuData;
  }> {
    return forkJoin({
      triDaiLy: this.getTriDaiLyData(),
      suKienLichSu: this.getSuKienLichSuData(),
      diTichLichSu: this.getDiTichLichSuData(),
      nhanVatLichSu: this.getNhanVatLichSuData()
    });
  }
} 