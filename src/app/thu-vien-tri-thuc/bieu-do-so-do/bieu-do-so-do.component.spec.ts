import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieuDoSoDoComponent } from './bieu-do-so-do.component';

describe('BieuDoSoDoComponent', () => {
  let component: BieuDoSoDoComponent;
  let fixture: ComponentFixture<BieuDoSoDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BieuDoSoDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BieuDoSoDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
