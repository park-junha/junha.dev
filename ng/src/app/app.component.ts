import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface NavRoutes extends Array<NavRoute>{};
interface NavRoute {
  label: string;
  route: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }

  title = 'junha-angular';
  home: string = '/';

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
