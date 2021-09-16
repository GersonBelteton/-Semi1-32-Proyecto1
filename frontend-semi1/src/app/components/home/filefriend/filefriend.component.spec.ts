import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilefriendComponent } from './filefriend.component';

describe('FilefriendComponent', () => {
  let component: FilefriendComponent;
  let fixture: ComponentFixture<FilefriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilefriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilefriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
