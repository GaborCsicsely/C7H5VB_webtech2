import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentComputerComponent } from './user-rent-computer.component';

describe('UserRentComputerComponent', () => {
  let component: UserRentComputerComponent;
  let fixture: ComponentFixture<UserRentComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRentComputerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRentComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
