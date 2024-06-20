import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComputerListComponent } from './user-computer-list.component';

describe('UserComputerListComponent', () => {
  let component: UserComputerListComponent;
  let fixture: ComponentFixture<UserComputerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComputerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComputerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
