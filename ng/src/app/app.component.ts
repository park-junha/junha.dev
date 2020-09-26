import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fadeAnimation } from './app.animations';
import { ApiService } from './api.service';
import {
  RIPPLE_COLOR_RED,
  FETCH_ALL_QUERY
} from '../environments/constants';
import { NavRoutes } from '../models/nav.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  private isMobile = (): boolean => {
    return window.innerWidth <= 720;
  };
  public showMobile: boolean = this.isMobile();
  public rippleColor: string = RIPPLE_COLOR_RED;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.fetch(FETCH_ALL_QUERY);
    window.onresize = () => this.showMobile = this.isMobile();
  }

  home: string = '/home';

  appRoutes: NavRoutes = [
    {
      'label': 'About',
      'route': '/about'
    },
    {
      'label': 'Experience',
      'route': '/experience'
    },
    {
      'label': 'Projects',
      'route': '/projects/personal'
    },
    {
      'label': 'Enterprise',
      'route': '/projects/enterprise'
    },
    {
      'label': 'Open Source',
      'route': '/projects/opensource'
    }
  ];

  routeIsActive = (route: string): boolean => {
    if (this.router.url === route) {
      return true;
    }
    return false;
  };

  destinationRoute = (route: string): string => {
    return this.routeIsActive(route) ? this.home : route;
  };
}
