import { Component, OnInit } from '@angular/core';

interface AboutContents {
  title: string;
  intro: string;
  interests: Interests;
};
interface Interests {
  heading: string;
  items: Array<Interest>;
};
interface Interest {
  name: string;
  url?: string;
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor() { }

  contents: AboutContents = {
    'title': 'Hi. My name is Junha Park.',
    'intro': 'I\'m a software engineer based in the Bay Area specializing \
      in Full Stack Development. My primary technologies are JavaScript \
      and its various flavors and frameworks, including React, Angular, \
      TypeScript, and Node.js. Outside of the JavaScript ecosystem, I also \
      use Python, SQL, and Go.',
    'interests': {
      'heading': 'These are some of my interests and hobbies:',
      'items': [
        {
          'name': 'Open source software',
          'url': 'https://github.com/park-junha'
        },
        {
          'name': 'Listening to music'
        },
        {
          'name': 'Fashion'
        },
        {
          'name': 'Twisty cube puzzles',
          'url': 'https://www.worldcubeassociation.org/persons/2015PARK22'
        },
        {
          'name': 'Video games'
        }
      ]
    }
  };
}
