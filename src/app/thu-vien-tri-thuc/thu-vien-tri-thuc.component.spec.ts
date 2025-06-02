import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuVienTriThucComponent } from './thu-vien-tri-thuc.component';

describe('ThuVienTriThucComponent', () => {
  let component: ThuVienTriThucComponent;
  let fixture: ComponentFixture<ThuVienTriThucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThuVienTriThucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuVienTriThucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
