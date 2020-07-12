import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fadeAnimation } from './app.animations';
import { ApiService } from './api.service';
import { RIPPLE_COLOR_RED } from '../environments/constants';

interface NavRoutes extends Array<NavRoute>{};
interface NavRoute {
  label: string;
  route: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  private query: string;
  private isMobile = (): boolean => {
    return window.innerWidth <= 720;
  };
  public showMobile: boolean = this.isMobile();
  public rippleColor: string = RIPPLE_COLOR_RED;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.query = '{ projects { project_id description title about url \
      source_code_url languages { name color } tools { name color } } }';
    this.apiService.fetch(this.query);
    window.onresize = () => this.showMobile = this.isMobile();
  }

  title = 'junha-angular';
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
      'route': '/projects'
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
