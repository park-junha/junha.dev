import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ProjectComponent } from './project/project.component';
import { ApiService } from '../api.service';
import { Project } from '../../models/api.models';
import { RIPPLE_COLOR_RED } from '../../environments/constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Array<Project>;
  isLoaded: boolean;
  _subscription: Subscription;
  _loadingSubscription: Subscription;
  rippleColor: string = RIPPLE_COLOR_RED;

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.projects = this.apiService.getProjects();
    this.isLoaded = !this.apiService.getLoadingState();
    this._loadingSubscription = apiService.loadingEmitter.subscribe(
      loadingState => { this.isLoaded = !loadingState; }
    );
    this._subscription = apiService.apiUpdate.subscribe(updated => {
      this.projects = updated.projects;
    });
  }

  showMore(project: Project): void {
    this.dialog.open(ProjectComponent, {
      width: '700px',
      backdropClass: 'backdrop-blur',
      panelClass: 'project-dialog',
      data: project
    });
  }
}
