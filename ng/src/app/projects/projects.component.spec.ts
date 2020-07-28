import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { ProjectsComponent } from './projects.component';
import { ApiService } from '../api.service';

import dummyData from '../../test.data';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let service: ApiService;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
      providers: [ ApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
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

  it('should have no initial projects data', () => {
    expect(component.projects.length).toEqual(0);
  });

  it('should update state and view when service is loading', () => {
    service.loadingEmitter.next(true);
    fixture.detectChanges();

    expect(component.isLoaded).toBe(false);
    expect(elementOf('#app-projects-loading')).not.toBeNull();
    expect(elementOf('#app-projects-content')).toBeNull();
  });

  it('should update state and view when service is loaded', () => {
    service.loadingEmitter.next(false);
    fixture.detectChanges();

    expect(component.isLoaded).toBe(true);
    expect(elementOf('#app-projects-loading')).toBeNull();
    expect(elementOf('#app-projects-content')).not.toBeNull();
  });

  it('should fetch and display correct experience data', () => {
    const expectedData = [
      {
        'title': 'V8',
        'languages': [
          {
            'name': 'C++',
            'color': '#f34b7d'
          }
        ],
        'tools': [],
        'description': 'JavaScript engine by Google',
        'about': 'Runs on Chrome and Node.js',
        'url': '',
        'source_code_url': ''
      },
      {
        'title': 'Personal Website',
        'languages': [
          {
            'name': 'TypeScript',
            'color': '#286c7f'
          },
          {
            'name': 'Go',
            'color': '#00add8'
          }
        ],
        'tools': [
          {
            'name': 'Angular',
            'color': '#a3112d'
          },
          {
            'name': 'GraphQL',
            'color': '#e535ab'
          }
        ],
        'description': 'This site',
        'about': 'Written in Angular with a GraphQL backend',
        'url': 'https://junha.dev',
        'source_code_url': 'https://github.com/park-junha/PersonalWebsite'
      }
    ];

    service.apiUpdate.next(dummyData);
    fixture.detectChanges();

    expect(JSON.stringify(component.projects))
      .toEqual(JSON.stringify(expectedData));
    expect(lengthOf('#app-projects-content mat-card'))
      .toEqual(expectedData.length);
  });

  it('should display projects data correctly', () => {
    component.projects = dummyData.projects;
    fixture.detectChanges();

    dummyData.projects.forEach((project, index) => {
      expect(textOf(`#app-projects-content \
        mat-card:nth-child(${index + 1}) mat-card-content h2`))
        .toEqual(project.title);
      expect(textOf(`#app-projects-content \
        mat-card:nth-child(${index + 1}) mat-card-content p`))
        .toEqual(project.description);
    });
  });

});
