import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNumComponent } from './mobile-num.component';

describe('MobileNumComponent', () => {
  let component: MobileNumComponent;
  let fixture: ComponentFixture<MobileNumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileNumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
