import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellersAgeComponent } from './travellers-age.component';

describe('TravellersAgeComponent', () => {
  let component: TravellersAgeComponent;
  let fixture: ComponentFixture<TravellersAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellersAgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravellersAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
