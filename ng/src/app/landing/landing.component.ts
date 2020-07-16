import { Component } from '@angular/core';

interface LandingContents {
  title: string;
};

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor() { }

  contents: LandingContents = {
    'title': 'Welcome'
  };
}
