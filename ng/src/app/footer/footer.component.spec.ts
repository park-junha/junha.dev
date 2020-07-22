import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [ MatToolbarModule, FontAwesomeModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
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

  it('should include correct version on footer', () => {
    expect(textOf('#version span')).toEqual(component.version);
  });
});
