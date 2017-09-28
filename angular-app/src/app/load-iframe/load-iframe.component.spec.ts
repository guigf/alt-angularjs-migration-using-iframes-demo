import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadIframeComponent } from './load-iframe.component';

describe('LoadIframeComponent', () => {
  let component: LoadIframeComponent;
  let fixture: ComponentFixture<LoadIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
