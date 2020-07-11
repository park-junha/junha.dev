import { Component, OnInit } from '@angular/core';
import { ApiService, Project } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project>;
  _subscription: Subscription;

  constructor(private apiService: ApiService) {
    this.projects = this.apiService.getProjects();
    this._subscription = apiService.apiUpdate.subscribe(updated => {
      this.projects = updated.projects;
    });
  }

  ngOnInit(): void {

  }

}
