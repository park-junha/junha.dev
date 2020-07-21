import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../environments/environment';

import {
  ApiResponse,
  Api,
//Tool,
  Experience,
  Project
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: Api;
  private url: string;
  private headers: HttpHeaders;
  public isLoading: boolean;

  apiUpdate: Subject<Api> = new Subject<Api>();
  loadingEmitter: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.api = {
      'experiences': [],
      'projects': []
    };
    this.isLoading = false;
  }

  fetch(query: string): void {
    this.isLoading = true;
    this.loadingEmitter.next(this.isLoading);
    this.http.post<ApiResponse>(
      this.url,
      { 'query': query },
      { 'headers': this.headers }
    ).subscribe(res => {
      this.api.projects = res.data.projects;
      this.api.experiences = res.data.experiences;
      this.apiUpdate.next(this.api);
      this.isLoading = false;
      this.loadingEmitter.next(this.isLoading);
    });
  }

  get(): Api {
    return this.api;
  }

  getLoadingState(): boolean {
    return this.isLoading;
  }

  getExperiences(): Array<Experience> {
    return this.api.experiences;
  }

  getProjects(): Array<Project> {
    return this.api.projects;
  }
}
