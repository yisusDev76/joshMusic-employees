import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstPage } from './first.page';

describe('FirstPage', () => {
  let component: FirstPage;
  let fixture: ComponentFixture<FirstPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
