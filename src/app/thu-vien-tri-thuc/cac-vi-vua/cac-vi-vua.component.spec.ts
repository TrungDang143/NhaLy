import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacViVuaComponent } from './cac-vi-vua.component';

describe('CacViVuaComponent', () => {
  let component: CacViVuaComponent;
  let fixture: ComponentFixture<CacViVuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacViVuaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacViVuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
