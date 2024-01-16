import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperfooterComponent } from './upperfooter.component';

describe('UpperfooterComponent', () => {
  let component: UpperfooterComponent;
  let fixture: ComponentFixture<UpperfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpperfooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
