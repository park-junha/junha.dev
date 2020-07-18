import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { ExperienceComponent } from './experience.component';
import { ApiService } from '../api.service';

import dummyData from '../../test.data';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let service: ApiService;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceComponent ],
      imports: [
        HttpClientTestingModule,
        MatExpansionModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  function elementOf(selector) {
    return fixture.debugElement.nativeElement.querySelector(selector);
  }

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

  it('should have no initial experience data', () => {
    expect(component.experiences.length).toEqual(0);
  });

  it('should update state and view when service is loading', () => {
    service.loadingEmitter.next(true);
    fixture.detectChanges();

    expect(component.isLoaded).toBe(false);
    expect(elementOf('#app-experience-loading')).not.toBeNull();
    expect(elementOf('#app-experience-accordion')).toBeNull();
  });

  it('should update state and view when service is loaded', () => {
    service.loadingEmitter.next(false);
    fixture.detectChanges();

    expect(component.isLoaded).toBe(true);
    expect(elementOf('#app-experience-loading')).toBeNull();
    expect(elementOf('#app-experience-accordion')).not.toBeNull();
  });

  it('should fetch and display correct experience data', () => {
    const expectedData = [
      {
        'label': 'Google',
        'company': 'Google',
        'title': 'Software Engineer',
        'start_date': '2019-01-01T00:00:00Z',
        'end_date': 'Current',
        'description': [
          'Full Stack Software Engineer crushin it'
        ]
      },
      {
        'label': 'IBM',
        'company': 'IBM',
        'title': 'Software Engineer',
        'start_date': '2016-01-01T00:00:00Z',
        'end_date': '2018-12-31T00:00:00Z',
        'description': [
          'BigFix is no longer owned by IBM'
        ]
      }
    ];

    service.apiUpdate.next(dummyData);
    fixture.detectChanges();

    expect(JSON.stringify(component.experiences))
      .toEqual(JSON.stringify(expectedData));
    expect(lengthOf('#app-experience-accordion mat-expansion-panel'))
      .toEqual(expectedData.length);
  });

  it('should correctly format dates with defined endDate', () => {
    const expectedLongRange = 'Jan 2019 - Current';
    const expectedShortRange = '01/19 - Current';

    expect(component.getLongDateRange(dummyData.experiences[0]))
      .toEqual(expectedLongRange);
    expect(component.getShortDateRange(dummyData.experiences[0]))
      .toEqual(expectedShortRange);
  });

  it('should correctly format dates with undefined endDate', () => {
    const expectedLongRange = 'Jan 2016 - Dec 2018';
    const expectedShortRange = '01/16 - 12/18';

    expect(component.getLongDateRange(dummyData.experiences[1]))
      .toEqual(expectedLongRange);
    expect(component.getShortDateRange(dummyData.experiences[1]))
      .toEqual(expectedShortRange);
  });

  it('should be responsive to xs layoutView', () => {
    component.experiences = dummyData.experiences;
    component.layoutView = 'xs';
    fixture.detectChanges();

    expect(textOf('mat-panel-title span'))
      .toEqual(component.experiences[0].label);
    expect(textOf('mat-panel-description span'))
      .toEqual(component.getShortDateRange(component.experiences[0]));
  });

  it('should be responsive to sm layoutView', () => {
    component.experiences = dummyData.experiences;
    component.layoutView = 'sm';
    fixture.detectChanges();

    expect(textOf('mat-panel-title span'))
      .toEqual(component.experiences[0].company);
    expect(textOf('mat-panel-description span'))
      .toEqual(component.getShortDateRange(component.experiences[0]));
  });

  it('should be responsive to md layoutView', () => {
    component.experiences = dummyData.experiences;
    component.layoutView = 'md';
    fixture.detectChanges();

    expect(textOf('mat-panel-title span'))
      .toEqual(component.experiences[0].title);
    expect(textOf('mat-panel-description span'))
      .toEqual(component.experiences[0].company);
    expect(textOf('mat-panel-description span:nth-child(2)'))
      .toEqual(component.getShortDateRange(component.experiences[0]));
  });

});
