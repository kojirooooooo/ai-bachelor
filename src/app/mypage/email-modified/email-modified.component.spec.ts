import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailModifiedComponent } from './email-modified.component';

describe('EmailModifiedComponent', () => {
  let component: EmailModifiedComponent;
  let fixture: ComponentFixture<EmailModifiedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailModifiedComponent]
    });
    fixture = TestBed.createComponent(EmailModifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
