import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService, Experience } from '../api.service';
import { RIPPLE_COLOR_RED } from '../../environments/constants';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiences: Array<Experience>;
  isLoaded: boolean;
  _subscription: Subscription;
  _loadingSubscription: Subscription;
  rippleColor: string = RIPPLE_COLOR_RED;

  constructor(private apiService: ApiService) {
    this.experiences = this.apiService.getExperiences();
    this.isLoaded = !this.apiService.getLoadingState();
    this._loadingSubscription = apiService.loadingEmitter.subscribe(
      loadingState => { this.isLoaded = !loadingState; }
    );
    this._subscription = apiService.apiUpdate.subscribe(updated => {
      this.experiences = updated.experiences;
    });
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleString('default', {
      month: 'short',
      year: 'numeric'
    });
  }

  getDateRange(experience: Experience): string {
    let start: string = this.formatDate(experience.start_date)
    let end: string = (experience.end_date === 'Current' ?
      'Current' : this.formatDate(experience.end_date));
    return `${start} - ${end}`;
  }
}
