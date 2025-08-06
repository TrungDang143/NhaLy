# NhaLy - Ứng dụng Thư viện Tri thức Triều đại Nhà Lý

Ứng dụng web tương tác về triều đại nhà Lý (1009-1225) với dữ liệu phong phú từ các file JSON.

## 🚀 Tính năng chính

### 📚 Thư viện Tri thức
- **Các vị vua**: Thông tin chi tiết về 4 vị vua chính của triều Lý
- **Sự kiện lịch sử**: 22 sự kiện quan trọng từ 1009-1225
- **Nhân vật lịch sử**: Danh sách các nhân vật nổi bật
- **Di tích lịch sử**: Thông tin về các di tích thời Lý
- **Văn bản chiếu chỉ**: Các văn bản lịch sử quan trọng

### 🗺️ Biểu đồ & Sơ đồ
- Bản đồ lãnh thổ triều Lý
- Sơ đồ kiến trúc Hoàng thành Thăng Long
- Bản đồ trận đánh lịch sử
- Mạng lưới giao thông thời Lý

### 🎯 Dữ liệu JSON
Ứng dụng sử dụng 4 file JSON chính:

1. **`tri-dai-ly-data.json`** - Thông tin tổng quan về triều đại
2. **`su-kien-lich-su.json`** - Các sự kiện lịch sử quan trọng
3. **`nhan-vat-lich-su.json`** - Danh sách nhân vật lịch sử
4. **`di-tich-lich-su.json`** - Thông tin di tích lịch sử

## 🛠️ Cài đặt & Chạy

### Yêu cầu hệ thống
- Node.js (version 16+)
- Angular CLI (version 19+)

### Cài đặt
```bash
npm install
```

### Chạy ứng dụng

#### Local Development
```bash
npm run serve:local
# hoặc
ng serve
```

#### Production (với base href cho GitHub Pages)
```bash
npm run serve:prod
```

### Build

#### Development
```bash
npm run build:dev
```

#### Production
```bash
npm run build:prod
```

### Deploy lên GitHub Pages
```bash
npm run deploy
```

## 📁 Cấu trúc dữ liệu

### Triều đại Lý (`tri-dai-ly-data.json`)
```json
{
  "triDaiLy": {
    "thongTinChung": {
      "ten": "Triều đại nhà Lý",
      "thoiGianTonTai": "1009-1225",
      "soNam": 216,
      "soDoiVua": 9
    },
    "cacViVua": [
      {
        "ten": "Lý Thái Tổ",
        "tenThat": "Lý Công Uẩn",
        "thoiGianTriVi": "19 năm (1009-1028)",
        "thanhTuu": [...]
      }
    ]
  }
}
```

### Sự kiện lịch sử (`su-kien-lich-su.json`)
```json
{
  "suKienLichSu": [
    {
      "nam": 1010,
      "suKien": "Dời đô về Thăng Long",
      "moTa": "Lý Thái Tổ ban Chiếu dời đô...",
      "viVua": "Lý Thái Tổ",
      "tamQuan": true
    }
  ]
}
```

## 🎨 Giao diện

Ứng dụng sử dụng:
- **Bootstrap 5** cho UI framework
- **Angular 19** cho frontend framework
- **Responsive design** cho mobile và desktop
- **Modern UI/UX** với animations và transitions

## 🔧 Cấu hình

### Base Href
- **Local development**: `/`
- **GitHub Pages**: `/NhaLy/`

### Environment
- **Development**: `ng serve`
- **Production**: `ng build --base-href=/NhaLy/`

## 📊 Thống kê dữ liệu

- **4 vị vua chính** với thông tin chi tiết
- **22 sự kiện lịch sử** quan trọng
- **12 nhân vật lịch sử** nổi bật
- **12 di tích lịch sử** quan trọng
- **5 bản đồ và sơ đồ** tương tác

## 🌟 Tính năng nổi bật

- ✅ **Dữ liệu phong phú** từ JSON files
- ✅ **Giao diện responsive** 
- ✅ **Tương tác 3D** (đang phát triển)
- ✅ **Bản đồ tương tác** (đang phát triển)
- ✅ **VR/AR support** (đang phát triển)
- ✅ **Deploy tự động** lên GitHub Pages

## 📝 Ghi chú

- Ứng dụng sử dụng dữ liệu mock làm fallback khi không load được JSON
- Các tính năng 3D, VR/AR đang trong giai đoạn phát triển
- Dữ liệu được cập nhật từ các nguồn lịch sử đáng tin cậy

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.
