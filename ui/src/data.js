const data = {
  'TechnicalSkills': [
    {
      'skillset': 'Codebases',
      'skills': [
        {
          'name': 'Python',
          'level': 5,
          'desc': 'My primary general-purpose, high-level software development language.'
        },
        {
          'name': 'JavaScript',
          'level': 5,
          'desc': 'My primary web development language.'
        },
        {
          'name': 'TypeScript',
          'level': 3,
          'desc': 'Slowly switching from JavaScript to TypeScript for better development practices.'
        },
        {
          'name': 'Bash / Shell',
          'level': 3,
          'desc': 'I write Shell Scripts to automate procedures sometimes.'
        },
        {
          'name': 'C++',
          'level': 3,
          'desc': 'The first programming language I learned.'
        }
      ]
    },
    {
      'skillset': 'Frontend',
      'skills': [
        {
          'name': 'React / JSX',
          'level': 5,
          'desc': 'My primary web frontend framework.'
        },
        {
          'name': 'Bootstrap',
          'level': 4,
          'desc': 'CSS is awful.'
        },
        {
          'name': 'HTML / CSS',
          'level': 4,
          'desc': 'I sometimes develop vanilla websites.'
        }
      ]
    },
    {
      'skillset': 'Backend',
      'skills': [
        {
          'name': 'Flask',
          'level': 5,
          'desc': 'My primary web backend framework. I also sometimes develop view controllers in Flask as well.'
        },
        {
          'name': 'Express',
          'level': 3,
          'desc': 'The other web backend framework I use.'
        },
        {
          'name': 'HTTP',
          'level': 4,
          'desc': 'For RESTful programming and data transfer between applications.'
        }
      ]
    },
    {
      'skillset': 'Databases',
      'skills': [
        {
          'name': 'MySQL',
          'level': 4,
          'desc': 'My primary relational database management system.'
        },
        {
          'name': 'PostgreSQL',
          'level': 3,
          'desc': 'Slowly switching my primary RDBMS from MySQL to PostgreSQL.'
        },
        {
          'name': 'MongoDB',
          'level': 3,
          'desc': 'Non-relational database service I use.'
        }
      ]
    },
    {
      'skillset': 'Cloud Services',
      'skills': [
        {
          'name': 'Amazon Web Services',
          'level': 4,
          'desc': 'Especially experienced with EC2, RDS, and S3 services.'
        },
        {
          'name': 'GitHub',
          'level': 3,
          'desc': 'Primarily used for codebases and lightweight task management.'
        }
      ]
    },
    {
      'skillset': 'Miscellaneous',
      'skills': [
        {
          'name': 'Git',
          'level': 5,
          'desc': 'I\'ve done hundreds of merges, interactive rebases, and conflict resolutions. I also sometimes use bisect and reflog.'
        },
        {
          'name': 'VIM',
          'level': 4,
          'desc': 'My editor of choice.'
        }
      ]
    }
  ],
  'ProfessionalExperience': {
    'defaultKey': 'IO',
    'experience': [
      {
        'id': 'HCL',
        'title': 'Software Engineer',
        'company': 'HCL Technologies',
        'start': 'May \'20',
        'end': 'Current',
        'body': '<div>Starting May 2020.</div>'
      },
      {
        'id': 'IO',
        'title': 'Full Stack Software Engineer',
        'company': 'Infinite Options',
        'start': 'Sep \'19',
        'end': 'May \'20',
        'body': '<div><i>Software Team Lead</i> and <i>Full Stack Developer</i> for a Web-based, customer-facing e-commerce <a href=\'https://preptoyourdoor.netlify.com/\' target=\'_blank\' rel=\'noopener noreferrer\'>platform</a><ul><li>Developed and scaled the web UI with <strong>React</strong> (a <strong>JavaScript</strong> web UI framework) and web APIs with <strong>Flask</strong> (a <strong>Python</strong> web framework)</li><li>Designed and developed a <strong>MySQL</strong> database and hosted it on <strong>AWS RDS</strong></li><li>Automated procedures and platform services with <strong>Python</strong> and <strong>Shell</strong> scripts</li><li>Performed <a href=\'https://github.com/infinite-options/Prep-To-Your-Door\' target=\'_blank\' rel=\'noopener noreferrer\'>code</a> reviews, merge conflict resolutions, and rebases using <strong>Git</strong></li><li>Deployed APIs to a serverless <strong>AWS Lambda</strong> infrastructure using <strong>Zappa</strong> and the web UI to <strong>Netlify</strong></li></ul><i>Technologies Used:</i><ul><li><strong>Codebases</strong>: Python, JavaScript, Bash</li><li><strong>Databases</strong>: MySQL</li><li><strong>Web Frameworks</strong>: Flask, React</li><li><strong>Cloud Services</strong>: AWS, Netlify, Zappa</li></div>'
      },
      {
        'id': 'GP',
        'title': 'Advisor to the Board',
        'company': 'Grad Planner',
        'start': 'Sep \'19',
        'end': 'Current',
        'body': '<div><i>Founding Engineer</i> and <i>Technical Advisor</i> to the Board of Directors<ul><li>Created a Web <a href=\'http://gradplanner.herokuapp.com/\' target=\'_blank\' rel=\'noopener noreferrer\'>resource</a> to assist undergraduate students graduate on time, prototyped using the <strong>LAMP</strong> (<strong>Python</strong>) stack</li><li>Directed the team to migrate the software to an MVC model with a <strong>React</strong> UI, <strong>Flask</strong> APIs, and a <strong>PostgreSQL</strong> database</li><li>Performed code reviews, merge conflict resolutions, task management, and interactive rebases using <strong>Git</strong> and <strong>GitHub</strong></li><li>Conducted technical interviews to onboard new interns and employees</li></ul><i>Technologies Used:</i><ul><li><strong>Codebases</strong>: Python, JavaScript</li><li><strong>Databases</strong>: MySQL, PostgreSQL</li><li><strong>Web Frameworks</strong>: Flask, React</li><li><strong>Cloud Services</strong>: AWS, Heroku</li></ul></div>'
      }
    ]
  }
};

export default data;
