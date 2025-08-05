import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article, King, HistoricalEvent, Document } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesSubject = new BehaviorSubject<Article[]>(this.getMockArticles());
  private kingsSubject = new BehaviorSubject<King[]>(this.getMockKings());
  private eventsSubject = new BehaviorSubject<HistoricalEvent[]>(this.getMockEvents());
  private documentsSubject = new BehaviorSubject<Document[]>(this.getMockDocuments());

  articles$ = this.articlesSubject.asObservable();
  kings$ = this.kingsSubject.asObservable();
  events$ = this.eventsSubject.asObservable();
  documents$ = this.documentsSubject.asObservable();

  constructor() { }

  // Articles methods
  getArticles(): Observable<Article[]> {
    return this.articles$;
  }

  getArticleById(id: string): Article | undefined {
    return this.articlesSubject.value.find(article => article.id === id);
  }

  getArticlesByCategory(category: string): Article[] {
    return this.articlesSubject.value.filter(article => article.category === category);
  }

  getFeaturedArticles(): Article[] {
    return this.articlesSubject.value.filter(article => article.featured);
  }

  addArticle(article: Article): void {
    const currentArticles = this.articlesSubject.value;
    this.articlesSubject.next([...currentArticles, article]);
  }

  updateArticle(article: Article): void {
    const currentArticles = this.articlesSubject.value;
    const index = currentArticles.findIndex(a => a.id === article.id);
    if (index !== -1) {
      currentArticles[index] = article;
      this.articlesSubject.next([...currentArticles]);
    }
  }

  deleteArticle(id: string): void {
    const currentArticles = this.articlesSubject.value;
    this.articlesSubject.next(currentArticles.filter(article => article.id !== id));
  }

  // Kings methods
  getKings(): Observable<King[]> {
    return this.kings$;
  }

  getKingById(id: string): King | undefined {
    return this.kingsSubject.value.find(king => king.id === id);
  }

  // Events methods
  getEvents(): Observable<HistoricalEvent[]> {
    return this.events$;
  }

  getEventById(id: string): HistoricalEvent | undefined {
    return this.eventsSubject.value.find(event => event.id === id);
  }

  // Documents methods
  getDocuments(): Observable<Document[]> {
    return this.documents$;
  }

  getDocumentById(id: string): Document | undefined {
    return this.documentsSubject.value.find(doc => doc.id === id);
  }

  private getMockArticles(): Article[] {
    return [
      {
        id: '1',
        title: 'Lý Công Uẩn - Vị hoàng đế sáng lập triều đại Lý',
        content: `<h2>Tiểu sử Lý Công Uẩn</h2>
        <p>Lý Công Uẩn (974-1028), tên thật là Lý Kông Uẩn, là vị hoàng đế sáng lập triều đại Lý tại Việt Nam. Ông sinh ra tại chùa Cổ Pháp (nay thuộc huyện Tiên Du, tỉnh Bắc Ninh) và được nuôi dưỡng bởi thiền sư Vạn Hạnh.</p>
        
        <h3>Thời thơ ấu và giáo dục</h3>
        <p>Từ nhỏ, Lý Công Uẩn đã thể hiện tài năng xuất chúng. Ông được thiền sư Vạn Hạnh giáo dục không chỉ về Phật pháp mà còn về văn chương, binh pháp và cách cai trị đất nước.</p>
        
        <h3>Con đường lên ngôi</h3>
        <p>Năm 1009, sau khi vua Lê Long Việt qua đời mà không có con trai kế vị, các quan lại trong triều đã chọn Lý Công Uẩn lên ngôi hoàng đế với niên hiệu Thuận Thiên.</p>
        
        <h3>Những cải cách quan trọng</h3>
        <ul>
        <li>Dời đô từ Hoa Lư về Thăng Long (Hà Nội ngày nay)</li>
        <li>Xây dựng hệ thống hành chính mới</li>
        <li>Khuyến khích phát triển nông nghiệp và thương mại</li>
        <li>Thiết lập quan hệ ngoại giao với các nước láng giềng</li>
        </ul>`,
        summary: 'Tìm hiểu về cuộc đời và sự nghiệp của Lý Công Uẩn, vị hoàng đế sáng lập triều đại Lý.',
        imageUrl: 'assets/img/service-1.jpg',
        category: 'kings',
        tags: ['Lý Công Uẩn', 'Hoàng đế', 'Sáng lập', 'Thăng Long'],
        createdDate: new Date('2024-01-15'),
        updatedDate: new Date('2024-01-15'),
        author: 'Nguyễn Ngọc Anh',
        featured: true,
        sketchfabId: 'abc123def456'
      },
      {
        id: '2',
        title: 'Hoàng thành Thăng Long - Trung tâm quyền lực triều Lý',
        content: `<h2>Lịch sử xây dựng Hoàng thành Thăng Long</h2>
        <p>Hoàng thành Thăng Long được xây dựng từ năm 1010 dưới thời Lý Thái Tổ, trở thành trung tâm chính trị, văn hóa của triều đại Lý trong suốt hơn 200 năm.</p>
        
        <h3>Kiến trúc và quy hoạch</h3>
        <p>Hoàng thành được thiết kế theo lối kiến trúc truyền thống Việt Nam, kết hợp với ảnh hưởng từ Trung Quốc nhưng vẫn giữ được nét đặc trưng riêng.</p>
        
        <h3>Các công trình chính</h3>
        <ul>
        <li>Cung Càn Nguyên - Nơi ở của hoàng gia</li>
        <li>Điện Thiên An - Nơi tổ chức các nghi lễ quan trọng</li>
        <li>Hậu viện - Khu vực sinh hoạt của hoàng hậu và cung phi</li>
        <li>Các khu vườn và ao hồ</li>
        </ul>`,
        summary: 'Khám phá kiến trúc và lịch sử của Hoàng thành Thăng Long thời Lý.',
        imageUrl: 'assets/img/service-3.jpg',
        category: 'maps',
        tags: ['Hoàng thành', 'Thăng Long', 'Kiến trúc', 'Lý Thái Tổ'],
        createdDate: new Date('2024-01-10'),
        updatedDate: new Date('2024-01-10'),
        author: 'Phạm Thị Thanh Hoa',
        featured: true,
        sketchfabId: 'xyz789uvw012'
      },
      {
        id: '3',
        title: 'Văn Miếu - Quốc Tử Giám: Trường đại học đầu tiên của Việt Nam',
        content: `<h2>Lịch sử thành lập Văn Miếu</h2>
        <p>Văn Miếu được xây dựng năm 1070 dưới thời Lý Thánh Tông để thờ Khổng Tử và các bậc hiền tài. Đây là biểu tượng của nền giáo dục Việt Nam.</p>
        
        <h3>Quốc Tử Giám - Trường đại học đầu tiên</h3>
        <p>Năm 1076, Quốc Tử Giám được thành lập bên cạnh Văn Miếu, trở thành trường đại học đầu tiên của Việt Nam, đào tạo con em quý족 và những người có tài năng.</p>
        
        <h3>Chương trình giáo dục</h3>
        <ul>
        <li>Kinh Thi, Thư, Lễ, Dịch, Xuân Thu</li>
        <li>Lịch sử và địa lý</li>
        <li>Văn học và thi ca</li>
        <li>Đạo đức và phẩm hạnh</li>
        </ul>`,
        summary: 'Tìm hiểu về Văn Miếu - Quốc Tử Giám, cái nôi của nền giáo dục Việt Nam.',
        imageUrl: 'assets/img/service-6.jpg',
        category: 'culture',
        tags: ['Văn Miếu', 'Quốc Tử Giám', 'Giáo dục', 'Lý Thánh Tông'],
        createdDate: new Date('2024-01-08'),
        updatedDate: new Date('2024-01-08'),
        author: 'Lê Minh Cương',
        featured: false
      }
    ];
  }

  private getMockKings(): King[] {
    return [
      {
        id: '1',
        name: 'Lý Công Uẩn (Lý Thái Tổ)',
        reignPeriod: '1009-1028',
        birthYear: 974,
        deathYear: 1028,
        biography: 'Vị hoàng đế sáng lập triều đại Lý, sinh tại chùa Cổ Pháp, được thiền sư Vạn Hạnh nuôi dưỡng và giáo dục.',
        achievements: [
          'Sáng lập triều đại Lý',
          'Dời đô về Thăng Long',
          'Xây dựng nền tảng cho triều đại phồn thịnh',
          'Thiết lập hệ thống hành chính hiệu quả'
        ],
        imageUrl: 'assets/img/service-1.jpg',
        sketchfabId: 'ly-cong-uan-3d'
      },
      {
        id: '2',
        name: 'Lý Phật Mã (Lý Thái Tông)',
        reignPeriod: '1028-1054',
        birthYear: 1000,
        deathYear: 1054,
        biography: 'Con trai của Lý Thái Tổ, tiếp tục công cuộc xây dựng và phát triển đất nước.',
        achievements: [
          'Mở rộng lãnh thổ',
          'Phát triển kinh tế',
          'Tăng cường quân sự',
          'Xây dựng nhiều công trình văn hóa'
        ],
        imageUrl: 'assets/img/service-2.jpg'
      },
      {
        id: '3',
        name: 'Lý Nhật Tôn (Lý Thánh Tông)',
        reignPeriod: '1054-1072',
        birthYear: 1023,
        deathYear: 1072,
        biography: 'Vị vua có nhiều đóng góp trong việc phát triển giáo dục và văn hóa.',
        achievements: [
          'Thành lập Văn Miếu (1070)',
          'Phát triển hệ thống giáo dục',
          'Khuyến khích học tập',
          'Tôn vinh các bậc hiền tài'
        ],
        imageUrl: 'assets/img/service-7.jpg'
      }
    ];
  }

  private getMockEvents(): HistoricalEvent[] {
    return [
      {
        id: '1',
        title: 'Dời đô về Thăng Long (1010)',
        date: '1010',
        description: 'Lý Công Uẩn quyết định dời đô từ Hoa Lư về Thăng Long, đánh dấu bước ngoặt quan trọng trong lịch sử Việt Nam.',
        significance: 'Sự kiện này tạo nền tảng cho sự phát triển lâu dài của Thăng Long - Hà Nội ngày nay.',
        relatedKings: ['1'],
        imageUrl: 'assets/img/carousel-1.jpg',
        location: 'Thăng Long (Hà Nội)'
      },
      {
        id: '2',
        title: 'Thành lập Văn Miếu (1070)',
        date: '1070',
        description: 'Lý Thánh Tông cho xây dựng Văn Miếu để thờ Khổng Tử và các bậc hiền tài.',
        significance: 'Đánh dấu sự quan tâm của triều đình đối với giáo dục và văn hóa.',
        relatedKings: ['3'],
        imageUrl: 'assets/img/service-6.jpg',
        location: 'Thăng Long'
      }
    ];
  }

  private getMockDocuments(): Document[] {
    return [
      {
        id: '1',
        title: 'Chiếu dời đô',
        type: 'edict',
        content: 'Chiếu chỉ của Lý Thái Tổ về việc dời đô từ Hoa Lư về Thăng Long năm 1010.',
        author: 'Lý Thái Tổ',
        year: 1010,
        description: 'Văn bản lịch sử quan trọng ghi lại quyết định dời đô của Lý Thái Tổ.',
        imageUrl: 'assets/img/service-4.jpg'
      },
      {
        id: '2',
        title: 'Nam quốc sơn hà',
        type: 'poem',
        content: 'Nam quốc sơn hà nam đế cư, Tiệt nhiên định phận tại thiên thư...',
        author: 'Lý Thường Kiệt',
        year: 1077,
        description: 'Bài thơ nổi tiếng thể hiện tinh thần yêu nước và ý chí độc lập của dân tộc.',
        imageUrl: 'assets/img/service-8.jpg'
      }
    ];
  }
}