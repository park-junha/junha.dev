import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [ MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function textOf(selector) {
    return fixture.debugElement.nativeElement.querySelector(selector)
      .innerHTML;
  }

  function lengthOf(selector) {
    return fixture.debugElement.nativeElement.querySelectorAll(selector)
      .length;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text in app-about-title', () => {
    expect(textOf('#app-about-title')).not.toEqual('');
  });

  it('should bind contents.title to app-about-title', () => {
    expect(textOf('#app-about-title')).toEqual(component.contents.title);
  });

  it('should contain text in app-about-intro', () => {
    expect(textOf('#app-about-intro')).not.toEqual('');
  });

  it('should bind contents.intro to app-about-intro', () => {
    expect(textOf('#app-about-intro')).toEqual(component.contents.intro);
  });

  it('should contain text in app-about-interests-h', () => {
    expect(textOf('#app-about-interests-h')).not.toEqual('');
  });

  it('should bind contents.interests.heading to app-about-interests-h',
    () => {
    expect(textOf('#app-about-interests-h'))
      .toEqual(component.contents.interests.heading);
  });

  it('should bind contents.interests.items to app-about-interests', () => {
    expect(lengthOf('#app-about-interests li'))
      .toEqual(component.contents.interests.items.length);
  });

  it('should contain text in app-about-contact-h', () => {
    expect(textOf('#app-about-contact-h')).not.toEqual('');
  });

  it('should bind contents.contact.heading to app-about-contact-h', () => {
    expect(textOf('#app-about-contact-h'))
      .toEqual(component.contents.contact.heading);
  });

  it('should bind contents.contact.items to app-about-contact',
    () => {
    expect(lengthOf('#app-about-contact li'))
      .toEqual(component.contents.contact.items.length);
  });

});
