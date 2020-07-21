import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTabsModule,
        MatRippleModule,
        MatListModule,
        MatToolbarModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        FooterComponent,
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  function elementOf(selector) {
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

  function textOf(selector) {
    return fixture.debugElement.nativeElement.querySelector(selector)
      .innerText;
  }

  function hrefOf(selector) {
    return fixture.debugElement.nativeElement.querySelector(selector)
      .href;
  }

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should start app on root route', () => {
    expect(app.routeIsActive('/')).toBe(true);
  });

  it('should render mobile layout when showMobile is true', () => {
    app.showMobile = true;
    fixture.detectChanges();

    expect(elementOf('#app-mobile-navbar')).not.toBeNull();
    expect(elementOf('#app-contents-left')).toBeNull();

    app.appRoutes.forEach((route, index) => {
      expect(textOf(`#app-mobile-navbar a:nth-child(${index + 1})`))
        .toEqual(route.label);
    });
  });

  it('should render side nav bar when showMobile is false', () => {
    app.showMobile = false;
    fixture.detectChanges();

    expect(elementOf('#app-mobile-navbar')).toBeNull();
    expect(elementOf('#app-contents-left')).not.toBeNull();

    app.appRoutes.forEach((route, index) => {
      expect(textOf(`#app-contents-left mat-nav-list \
        a:nth-child(${index + 1})`))
        .toEqual(route.label);
    });
  });

  it('should have correct routes on side nav links', () => {
    app.showMobile = false;
    fixture.detectChanges();

    app.appRoutes.forEach((route, index) => {
      expect(hrefOf(`#app-contents-left mat-nav-list \
        a:nth-child(${index + 1})`))
        .toContain(route.route);
    });
  });

  it('should have correct routes on mobile nav links', () => {
    app.showMobile = true;
    fixture.detectChanges();

    app.appRoutes.forEach((route, index) => {
      expect(hrefOf(`#app-mobile-navbar a:nth-child(${index + 1})`))
        .toContain(route.route);
    });
  });

});
