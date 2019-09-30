import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomicilioPage } from './domicilio.page';

describe('DomicilioPage', () => {
  let component: DomicilioPage;
  let fixture: ComponentFixture<DomicilioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomicilioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
