export const data = {
  'Versions': [
    {
      'version': '1.3.0',
      'notes': [
        {
          'label': 'Feature',
          'desc': 'Replaced Skills and Experience components with new Resume component.'
        },
        {
          'label': 'Feature',
          'desc': 'Footer now automatically gets most up to date version.'
        },
        {
          'label': 'Known Issue',
          'desc': 'Resume does not render as expected on some mobile browsers.'
        }
      ]
    },
    {
      'version': '1.2.0',
      'notes': [
        {
          'label': 'Feature',
          'desc': 'Added Projects section.'
        }
      ]
    },
    {
      'version': '1.1.2',
      'notes': [
        {
          'label': 'Feature',
          'desc': 'Added link to resume.'
        }
      ]
    },
    {
      'version': '1.1.1',
      'notes': [
        {
          'label': 'Bugfix',
          'desc': 'Fixed CSS issue causing unexpected 1% opacity for some labels.'
        }
      ]
    },
    {
      'version': '1.1.0',
      'notes': [
        {
          'label': 'Feature',
          'desc': 'Added a Skills section.'
        },
        {
          'label': 'Feature',
          'desc': 'Separated data from codebase into a single file.'
        },
        {
          'label': 'Feature',
          'desc': 'Added Release Notes, accessible via footer.'
        }
      ]
    },
    {
      'version': '1.0.1',
      'notes': [
        {
          'label': 'Feature',
          'desc': 'Added mobile device viewability.'
        }
      ]
    },
    {
      'version': '1.0.0',
      'notes': [
        {
          'label': 'Feature',
          'desc': 'First public release.'
        },
        {
          'label': 'Feature',
          'desc': 'Added About Me and Experience sections.'
        },
        {
          'label': 'Feature',
          'desc': 'Added links to GitHub and LinkedIn.'
        }
      ]
    }
  ],
  'Projects': [
    {
      'name': 'Prep To Your Door',
      'desc': 'A web e-commerce platform for a meal prep business based in Austin.',
      'about': 'This application consists of a web UI, a MySQL database, and an API that facilitates data flow between the frontend and backend. The UI is written with React, a JavaScript web frontend framework, and deployed to Netlify. The API is written with Flask, a Python web backend framework and is deployed to AWS Lambda. User subscription billing is automated with Python and Shell scripts on AWS EC2.',
      'app': 'https://preptoyourdoor.netlify.app/',
      'src': 'https://github.com/infinite-options/Prep-To-Your-Door',
      'languages': [
        'la01',
        'la02',
        'la03',
        'la07'
      ]
    },
    {
      'name': 'Grad Planner',
      'desc': 'Helping students graduate on time.',
      'about': 'This software allows students to generate a four-year undergraduate plan within seconds. All they have to do is tell the application their major and classes taken, and then our super smart algorithm will give them a roadmap of their classes. Web platform developed with a React UI, a Flask API, and a PostgreSQL database, supported by a unique Python scheduling algorithm.',
      'app': 'http://gradplanner.us/',
      'src': null,
      'languages': [
        'la01',
        'la02',
        'la10'
      ]
    },
    {
      'name': 'Serving Now',
      'desc': 'A web and mobile meal ordering platform.',
      'about': 'Farmers can upload their menu via the web platform and customers can order from farmers through the mobile application. Web platform is written with Flask and the mobile app is written in C# with Xamarin.',
      'app': 'https://servingnow.me/home',
      'src': 'https://github.com/infinite-options/serving-now-webapp',
      'languages': [
        'la01',
        'la09',
        'la08'
      ]
    },
    {
      'name': 'Personal Website',
      'desc': 'This site!',
      'about': 'This website was created using React and with the intent of teaching myself TypeScript.',
      'app': 'https://junha.netlify.app/',
      'src': 'https://github.com/park-junha/PersonalWebsite',
      'languages': [
        'la04',
        'la05'
      ]
    },
    {
      'name': 'CovidSweeper',
      'desc': 'Minesweeper, but with a twist.',
      'about': 'This is a variation of Minesweeper I developed during the early stages of the COVID-19 pandemic, mostly intended to familiarize myself with manipulating canvas with JavaScript and also entertain myself and others.',
      'app': 'https://park-junha.github.io/CovidSweeper/',
      'src': 'https://github.com/park-junha/CovidSweeper',
      'languages': [
        'la02',
        'la05',
        'la09'
      ]
    },
    {
      'name': 'Web App Template (FARM)',
      'desc': 'A full stack web application template that uses a Python backend and a React frontend.',
      'about': 'This is a template web application that uses what I like to call the FARM stack: a Flask API, Amazon Web Services, a React UI, and a MySQL database. It is designed for developers to use and build on top of this template.',
      'app': null,
      'src': 'https://github.com/park-junha/WebAppTemplate-FARM',
      'languages': [
        'la01',
        'la02',
        'la03'
      ]
    },
    {
      'name': 'Leetcode',
      'desc': 'My solutions to various Leetcode problems.',
      'about': null, 
      'app': null,
      'src': 'https://github.com/park-junha/Leetcode',
      'languages': [
        'la06'
      ]
    }
  ],
  'language_ids': {
    'la01': {
      'name': 'Python',
      'color': '#3572ae'
    },
    'la02': {
      'name': 'JavaScript',
      'color': '#f1e05a'
    },
    'la03': {
      'name': 'MySQL',
      'color': '#f18e33'
    },
    'la04': {
      'name': 'TypeScript',
      'color': '#286c7f'
    },
    'la05': {
      'name': 'CSS',
      'color': '#563d7c'
    },
    'la06': {
      'name': 'Java',
      'color': '#a26917'
    },
    'la07': {
      'name': 'Shell',
      'color': '#178600'
    },
    'la08': {
      'name': 'C#',
      'color': '#b845fc'
    },
    'la09': {
      'name': 'HTML',
      'color': '#a03115'
    },
    'la10': {
      'name': 'PostgreSQL',
      'color': '#438eff'
    },
    'la11': {
      'name': 'MongoDB',
      'color': '#89e051'
    }
  }
};
