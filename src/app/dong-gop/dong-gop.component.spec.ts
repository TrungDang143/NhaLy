import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DongGopComponent } from './dong-gop.component';

describe('DongGopComponent', () => {
  let component: DongGopComponent;
  let fixture: ComponentFixture<DongGopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DongGopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DongGopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
