import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddBalanceComponent } from './user-add-balance.component';

describe('UserAddBalanceComponent', () => {
  let component: UserAddBalanceComponent;
  let fixture: ComponentFixture<UserAddBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAddBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
