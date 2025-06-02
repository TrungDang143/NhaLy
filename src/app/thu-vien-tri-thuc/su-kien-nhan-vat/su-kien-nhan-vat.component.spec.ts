import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuKienNhanVatComponent } from './su-kien-nhan-vat.component';

describe('SuKienNhanVatComponent', () => {
  let component: SuKienNhanVatComponent;
  let fixture: ComponentFixture<SuKienNhanVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuKienNhanVatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuKienNhanVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
