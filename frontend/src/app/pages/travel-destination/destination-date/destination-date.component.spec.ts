import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDateComponent } from './destination-date.component';

describe('DestinationDateComponent', () => {
  let component: DestinationDateComponent;
  let fixture: ComponentFixture<DestinationDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
