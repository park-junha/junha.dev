import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function textOf(selector) {
    return fixture.debugElement.nativeElement.querySelector(selector)
      .innerHTML;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text in header', () => {
    expect(textOf('#header')).not.toEqual('');
  });

  it('should bind contents.title to header', () => {
    expect(textOf('#header')).toEqual(component.contents.title);
  });
});
