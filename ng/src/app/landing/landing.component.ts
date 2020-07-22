import { Component } from '@angular/core';
import { LandingContents } from '../../models/landing.models';

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
