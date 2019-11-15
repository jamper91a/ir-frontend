import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersListPage } from './dealers-list.page';

describe('DealersListPage', () => {
  let component: DealersListPage;
  let fixture: ComponentFixture<DealersListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
