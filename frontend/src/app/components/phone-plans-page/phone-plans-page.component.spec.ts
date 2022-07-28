import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonePlansPageComponent } from './phone-plans-page.component';

describe('PhonePlansPageComponent', () => {
  let component: PhonePlansPageComponent;
  let fixture: ComponentFixture<PhonePlansPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhonePlansPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonePlansPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
