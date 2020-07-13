import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../environments/environment';

interface ApiResponse {
  data: {
    experiences?: Array<Experience>;
    experience?: Experience;
    projects?: Array<Project>;
    project?: Project;
  };
};

interface Api {
  projects: Array<Project>;
  experiences: Array<Experience>;
};

export interface Experience {
  label: string;
  company: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string[];
}

export interface Project {
  title: string;
  languages: Array<Tool>;
  tools: Array<Tool>;
  description: string;
  about: string | null;
  url: string | null;
  source_code_url: string | null;
};

interface Tool {
  name: string;
  color: string;
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: Api;
  private url: string;
  private headers: HttpHeaders;

  apiUpdate: Subject<Api> = new Subject<Api>();

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.api = {
      'experiences': [],
      'projects': []
    };
  }

  fetch(query: string): void {
    this.http.post<ApiResponse>(
      this.url,
      { 'query': query },
      { 'headers': this.headers }
    ).subscribe(res => {
      this.api.projects = res.data.projects;
      this.api.experiences = res.data.experiences;
      this.apiUpdate.next(this.api);
    });
  }

  get(): Api {
    return this.api;
  }

  getExperiences(): Array<Experience> {
    return this.api.experiences;
  }

  getProjects(): Array<Project> {
    return this.api.projects;
  }
}
