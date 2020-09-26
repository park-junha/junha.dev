import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { ApiService } from '../api.service';
import { Experience } from '../../models/api.models';
import { RIPPLE_COLOR_RED } from '../../environments/constants';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  public experiences: Array<Experience>;
  public isLoaded: boolean;
  public rippleColor: string = RIPPLE_COLOR_RED;
  public layoutView: 'xs' | 'sm' | 'md';

  private _subscription: Subscription;
  private _loadingSubscription: Subscription;

  constructor(private apiService: ApiService,
              public breakpointObserver: BreakpointObserver) {
    this.experiences = this.apiService.getExperiences();
    this.isLoaded = !this.apiService.getLoadingState();
    this._loadingSubscription = apiService.loadingEmitter.subscribe(
      loadingState => { this.isLoaded = !loadingState; }
    );
    this._subscription = apiService.apiUpdate.subscribe(updated => {
      this.experiences = updated.experiences;
    });
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        this.layoutView = 'xs';
      }
      else if (state.breakpoints[Breakpoints.Small]) {
        this.layoutView = 'sm';
      }
      else {
        this.layoutView = 'md';
      }
    });
  }

  private formatShortDate(date: string): string {
    return new Date(date).toLocaleString('default', {
      timeZone: 'UTC',
      month: '2-digit',
      year: '2-digit'
    });
  }

  private formatLongDate(date: string): string {
    return new Date(date).toLocaleString('default', {
      timeZone: 'UTC',
      month: 'short',
      year: 'numeric'
    });
  }

  getShortDateRange(experience: Experience): string {
    let start: string = this.formatShortDate(experience.start_date)
    let end: string = (experience.end_date === 'Current' ?
      'Current' : this.formatShortDate(experience.end_date));
    return `${start} - ${end}`;
  }

  getLongDateRange(experience: Experience): string {
    let start: string = this.formatLongDate(experience.start_date)
    let end: string = (experience.end_date === 'Current' ?
      'Current' : this.formatLongDate(experience.end_date));
    return `${start} - ${end}`;
  }
}
