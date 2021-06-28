import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ProjectComponent } from './project/project.component';
import { ApiService } from '../api.service';
import { Project } from '../../models/api.models';
import { RIPPLE_COLOR_RED } from '../../environments/constants';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.styl']
})
export class ProjectsComponent {
  projects: Array<Project>;
  isLoaded: boolean;
  _subscription: Subscription;
  _loadingSubscription: Subscription;
  rippleColor: string = RIPPLE_COLOR_RED;

  constructor(
    private apiService: ApiService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    //  Force reload route on param change
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;

    //  Load and subscribe dynamically based on param
    switch (this._activatedRoute.snapshot.params.projectType) {
    case 'personal':
      this.projects = this.apiService.getPersonalProjects();
      this.isLoaded = !this.apiService.getLoadingState();
      this._loadingSubscription = apiService.loadingEmitter.subscribe(
        loadingState => { this.isLoaded = !loadingState; }
      );
      this._subscription = apiService.apiUpdate.subscribe(updated => {
        this.projects = updated.personal_projects;
      });
      break;
    /*
    case 'enterprise':
      this.projects = this.apiService.getProfessionalProjects();
      this.isLoaded = !this.apiService.getLoadingState();
      this._loadingSubscription = apiService.loadingEmitter.subscribe(
        loadingState => { this.isLoaded = !loadingState; }
      );
      this._subscription = apiService.apiUpdate.subscribe(updated => {
        this.projects = updated.professional_projects;
      });
      break;
    */
    case 'opensource':
      this.projects = this.apiService.getOpenSourceProjects();
      this.isLoaded = !this.apiService.getLoadingState();
      this._loadingSubscription = apiService.loadingEmitter.subscribe(
        loadingState => { this.isLoaded = !loadingState; }
      );
      this._subscription = apiService.apiUpdate.subscribe(updated => {
        this.projects = updated.open_source_projects;
      });
      break;
    default:
      this._router.navigate(['/404']);
    };
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
