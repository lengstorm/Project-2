import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhonesAndUsersComponent } from './add-phones-and-users.component';

describe('AddPhonesAndUsersComponent', () => {
  let component: AddPhonesAndUsersComponent;
  let fixture: ComponentFixture<AddPhonesAndUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhonesAndUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhonesAndUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
