import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCreateStepTwoPage } from './tags-create-step-two.page';

describe('TagsCreateStepTwoPage', () => {
  let component: TagsCreateStepTwoPage;
  let fixture: ComponentFixture<TagsCreateStepTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsCreateStepTwoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCreateStepTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
