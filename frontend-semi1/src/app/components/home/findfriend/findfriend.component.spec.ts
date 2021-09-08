import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindfriendComponent } from './findfriend.component';

describe('FindfriendComponent', () => {
  let component: FindfriendComponent;
  let fixture: ComponentFixture<FindfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
