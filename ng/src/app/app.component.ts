import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './app.animations';
import { ApiService } from './api.service';

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
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.fetch('{ projects { project_id title description \
      about url source_code_url languages { name color } tools { name \
      color } } }');
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
