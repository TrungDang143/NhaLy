import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanChieuChiComponent } from './van-ban-chieu-chi.component';

describe('VanBanChieuChiComponent', () => {
  let component: VanBanChieuChiComponent;
  let fixture: ComponentFixture<VanBanChieuChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanBanChieuChiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanBanChieuChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
