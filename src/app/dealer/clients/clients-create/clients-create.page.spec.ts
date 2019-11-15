import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCreatePage } from './clients-create.page';

describe('ClientsCreatePage', () => {
  let component: ClientsCreatePage;
  let fixture: ComponentFixture<ClientsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
