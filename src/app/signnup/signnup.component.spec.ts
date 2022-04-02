import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignnupComponent } from './signnup.component';

describe('SignnupComponent', () => {
  let component: SignnupComponent;
  let fixture: ComponentFixture<SignnupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignnupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignnupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
