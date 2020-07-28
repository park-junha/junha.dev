import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain no initial data', () => {
    const expectedData = {
      'experiences': [],
      'projects': []
    };

    expect(service.get()).toEqual(expectedData);
    expect(service.getProjects()).toEqual([]);
    expect(service.getExperiences()).toEqual([]);
  });

  it('should not be loading initially', () => {
    expect(service.getLoadingState()).toBe(false);
  });

});
