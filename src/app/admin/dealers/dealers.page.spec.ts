import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersPage } from './dealers.page';

describe('DealersPage', () => {
  let component: DealersPage;
  let fixture: ComponentFixture<DealersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
