import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersDetailPage } from './dealers-detail.page';

describe('DealersDetailPage', () => {
  let component: DealersDetailPage;
  let fixture: ComponentFixture<DealersDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
