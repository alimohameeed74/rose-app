/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ErrMessComponent } from './err-mess.component';

describe('ErrMessComponent', () => {
  let component: ErrMessComponent;
  let fixture: ComponentFixture<ErrMessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrMessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
