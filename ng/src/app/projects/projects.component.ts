import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ProjectComponent } from './project/project.component';
import { ApiService, Project } from '../api.service';
import { RIPPLE_COLOR_RED } from '../../environments/constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project>;
  _subscription: Subscription;
  rippleColor: string = RIPPLE_COLOR_RED;

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.projects = this.apiService.getProjects();
    this._subscription = apiService.apiUpdate.subscribe(updated => {
      this.projects = updated.projects;
    });
  }

  ngOnInit(): void {

  }

  showMore(project: Project): void {
    this.dialog.open(ProjectComponent, {
      width: '700px',
      data: project
    });
  }
}
