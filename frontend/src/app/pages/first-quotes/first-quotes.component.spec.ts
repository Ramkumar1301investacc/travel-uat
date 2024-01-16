import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstQuotesComponent } from './first-quotes.component';

describe('FirstQuotesComponent', () => {
  let component: FirstQuotesComponent;
  let fixture: ComponentFixture<FirstQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstQuotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
