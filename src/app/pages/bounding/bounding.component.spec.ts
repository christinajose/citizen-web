import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundingComponent } from './bounding.component';

describe('BoundingComponent', () => {
  let component: BoundingComponent;
  let fixture: ComponentFixture<BoundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
