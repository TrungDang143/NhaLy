export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  description: string;
  imageUrl: string;
  category: 'kings' | 'events' | 'documents' | 'maps' | 'culture' | 'archaeology';
  tags: string[];
  createdDate: Date;
  updatedDate: Date;
  author: string;
  featured: boolean;
  location?: string;
  date?: string; // Added for historical dates
  sketchfabId?: string; // For 3D models
  sketchfabUrl?: string; // For 3D models iframe
  vrContent?: string; // VR content URL
  arContent?: string; // AR content URL
  vrArUrl?: string; // Combined VR/AR URL
}

export interface King {
  id: string;
  name: string;
  reignPeriod: string;
  birthYear?: number;
  deathYear?: number;
  biography: string;
  achievements: string[];
  imageUrl: string;
  sketchfabId?: string;
  // Thêm các thuộc tính mới
  tenThat?: string;
  tuoiTho?: number;
  noiSinh?: string;
  nienHieu?: string[]; // Đổi từ niênHiệu thành nienHieu
  thongTinChiTiet?: {
    thanThe?: string;
    hoangHau?: string;
    conCai?: string;
    kyLuc?: string[];
    thanhTuuChiTiet?: {
      doiDo?: string;
      xayDung?: string;
      moRong?: string;
      phatGiao?: string;
      quanSu?: string;
      phapLuat?: string;
      vanHoa?: string;
      doiTenNuoc?: string;
      nhoGiao?: string;
      chinhSach?: string;
      nongNghiep?: string;
      quanDoi?: string;
      doiNgoai?: string;
      giaoDuc?: string;
    };
  };
}

export interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  significance: string;
  relatedKings: string[];
  imageUrl: string;
  location?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'edict' | 'poem' | 'letter' | 'chronicle';
  content: string;
  author?: string;
  year?: number;
  description: string;
  imageUrl?: string;
}

// Interface cho dữ liệu vua từ JSON
export interface VuaData {
  id?: number;
  ten: string;
  tenThat?: string;
  nienHieu?: string[]; // Đổi từ niênHiệu thành nienHieu
  ngaySinh?: string;
  ngayMat?: string;
  thoiGianTriVi: string;
  tuoiTho?: number;
  noiSinh?: string;
  thanThe: string;
  thanhTuu: string[];
  imageUrl?: string;
  sketchfabId?: string;
  thongTinChiTiet?: {
    thanThe?: string;
    hoangHau?: string;
    conCai?: string;
    kyLuc?: string[];
    thanhTuuChiTiet?: {
      doiDo?: string;
      xayDung?: string;
      moRong?: string;
      phatGiao?: string;
      quanSu?: string;
      phapLuat?: string;
      vanHoa?: string;
      doiTenNuoc?: string;
      nhoGiao?: string;
      chinhSach?: string;
      nongNghiep?: string;
      quanDoi?: string;
      doiNgoai?: string;
      giaoDuc?: string;
    };
  };
}