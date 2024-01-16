import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySearchBoxComponent } from './country-search-box.component';

describe('CountrySearchBoxComponent', () => {
  let component: CountrySearchBoxComponent;
  let fixture: ComponentFixture<CountrySearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrySearchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
