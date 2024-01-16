import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycVerifyComponent } from './kyc-verify.component';

describe('KycVerifyComponent', () => {
  let component: KycVerifyComponent;
  let fixture: ComponentFixture<KycVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
