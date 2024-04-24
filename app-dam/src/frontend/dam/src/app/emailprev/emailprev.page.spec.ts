import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailprevPage } from './emailprev.page';

describe('EmailprevPage', () => {
  let component: EmailprevPage;
  let fixture: ComponentFixture<EmailprevPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmailprevPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
