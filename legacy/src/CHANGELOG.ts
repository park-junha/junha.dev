const versions = [
  {
    "version": "2.1.1",
    "notes": [
      {
        "label": "Miscellaneous",
        "desc": "Updated resume (Aug 2020)."
      }
    ]
  },
  {
    "version": "2.0.1",
    "notes": [
      {
        "label": "Bugfix",
        "desc": "Added missing explicit semicolons to codebase."
      },
      {
        "label": "Bugfix",
        "desc": "Projects queries now preseve original order of the arrays of languages and tools stored in database."
      },
      {
        "label": "Feature",
        "desc": "View PDF button now lights up on hover."
      }
    ]
  },
  {
    "version": "2.0.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Migrated to PostgreSQL and adjusted API / UI data layer accordingly."
      },
      {
        "label": "Feature",
        "desc": "Heavy visuals overhaul."
      },
      {
        "label": "Feature",
        "desc": "API calls are now given 3 attempts."
      }
    ]
  },
  {
    "version": "1.8.5",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added AngularJS to Resume."
      }
    ]
  },
  {
    "version": "1.8.4",
    "notes": [
      {
        "label": "Feature",
        "desc": "Projects component now waits for all API calls to finish before rendering (prevents the No Data Found message from flashing)."
      }
    ]
  },
  {
    "version": "1.8.3",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added response body to API GET request."
      }
    ]
  },
  {
    "version": "1.8.2",
    "notes": [
      {
        "label": "Bugfix",
        "desc": "Fixed misnamed Config.AllowedOrigins property check in app initialization."
      }
    ]
  },
  {
    "version": "1.8.1",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added Shell script for deploying Go app to AWS Lambda. (Does not yet completely automate setting up an AWS Lambda function and an API Gateway)"
      },
      {
        "label": "Bugfix",
        "desc": "CORS is now disabled by default if ORIGINS_ALLOWED is not provided in .env for Go API."
      },
      {
        "label": "Miscellaneous",
        "desc": "Updated main, api, and db READMEs."
      }
    ]
  },
  {
    "version": "1.8.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Replaced Flask REST API with GraphQL API, written in Go. New API deployed to AWS Lambda."
      },
      {
        "label": "Feature",
        "desc": "Added optional chaining and nullish coalescing to Projects.tsx for null-value handling of API responses."
      }
    ]
  },
  {
    "version": "1.7.3",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added Other Technolgies section and data in Projects."
      }
    ]
  },
  {
    "version": "1.7.2",
    "notes": [
      {
        "label": "Miscellaneous",
        "desc": "Removed unused, deprecated CSS/TSX files (old Skills and Experience components)."
      }
    ]
  },
  {
    "version": "1.7.1",
    "notes": [
      {
        "label": "Feature",
        "desc": "Slight resume update (Technical Skills)."
      }
    ]
  },
  {
    "version": "1.7.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Separated Version Log from API and included it locally."
      },
      {
        "label": "Bugfix",
        "desc": "Footer once again automatically gets most up to date version."
      }
    ]
  },
  {
    "version": "1.6.4",
    "notes": [
      {
        "label": "Feature",
        "desc": "Updated Version Log button styling."
      }
    ]
  },
  {
    "version": "1.6.3",
    "notes": [
      {
        "label": "Feature",
        "desc": "Replaced Version Log view with buttons."
      },
      {
        "label": "Miscellaneous",
        "desc": "Added Python code quality status badge to README."
      }
    ]
  },
  {
    "version": "1.6.2",
    "notes": [
      {
        "label": "Bugfix",
        "desc": "Corrected potential state management issue on showModal() in Projects."
      }
    ]
  },
  {
    "version": "1.6.1",
    "notes": [
      {
        "label": "Regression",
        "desc": "Temporarily disabled Download PDF button on Resume component - still does not seem to work on Netlify."
      }
    ]
  },
  {
    "version": "1.6.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Replaced SVGs with PNGs to support exporting images in a PDF version of the resume."
      },
      {
        "label": "Feature",
        "desc": "Separated About Me and Contact sections."
      },
      {
        "label": "Miscellaneous",
        "desc": "Added live app and code quality statuses to README."
      }
    ]
  },
  {
    "version": "1.5.4",
    "notes": [
      {
        "label": "Feature",
        "desc": "Slight resume update (Education)."
      }
    ]
  },
  {
    "version": "1.5.3",
    "notes": [
      {
        "label": "Feature",
        "desc": "Slight style changes to buttons on Resume page (margin and button text)."
      }
    ]
  },
  {
    "version": "1.5.2",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added two View PDF buttons for Resume component, one to Amazon S3 and one to DropBox."
      }
    ]
  },
  {
    "version": "1.5.1",
    "notes": [
      {
        "label": "Regression",
        "desc": "Temporarily disabled PDF export function - does not seem to work on Netlify?"
      }
    ]
  },
  {
    "version": "1.5.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Resized Resume back to U.S. Letter and updated About Me."
      },
      {
        "label": "Feature",
        "desc": "Added functionality to download resume as a PDF. Still experimental (KendoReact isn't open source and is somewhat primitive)."
      },
      {
        "label": "Known Issue",
        "desc": "Resume does not render icons on PDF."
      }
    ]
  },
  {
    "version": "1.4.2",
    "notes": [
      {
        "label": "Feature",
        "desc": "Resized Resume to A4."
      }
    ]
  },
  {
    "version": "1.4.1",
    "notes": [
      {
        "label": "Miscellaneous",
        "desc": "Added ISC License."
      }
    ]
  },
  {
    "version": "1.4.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added a Flask API and MongoDB backend."
      },
      {
        "label": "Feature",
        "desc": "Added error handling for various HTTP status codes."
      },
      {
        "label": "Feature",
        "desc": "Wrote Shell scripts to access / write to the backend."
      },
      {
        "label": "Regression",
        "desc": "Footer version number is static again."
      }
    ]
  },
  {
    "version": "1.3.1",
    "notes": [
      {
        "label": "Bugfix",
        "desc": "Temporarily fixed unexpected button styling issues on landing page."
      }
    ]
  },
  {
    "version": "1.3.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Replaced Skills and Experience components with new Resume component."
      },
      {
        "label": "Feature",
        "desc": "Footer now automatically gets most up to date version."
      },
      {
        "label": "Known Issue",
        "desc": "Resume does not render as expected on some mobile browsers."
      }
    ]
  },
  {
    "version": "1.2.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added Projects section."
      }
    ]
  },
  {
    "version": "1.1.2",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added link to resume."
      }
    ]
  },
  {
    "version": "1.1.1",
    "notes": [
      {
        "label": "Bugfix",
        "desc": "Fixed CSS issue causing unexpected 1% opacity for some labels."
      }
    ]
  },
  {
    "version": "1.1.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added a Skills section."
      },
      {
        "label": "Feature",
        "desc": "Separated data from codebase into a single file."
      },
      {
        "label": "Feature",
        "desc": "Added Release Notes, accessible via footer."
      }
    ]
  },
  {
    "version": "1.0.1",
    "notes": [
      {
        "label": "Feature",
        "desc": "Added mobile device viewability."
      }
    ]
  },
  {
    "version": "1.0.0",
    "notes": [
      {
        "label": "Feature",
        "desc": "First public release."
      },
      {
        "label": "Feature",
        "desc": "Added About Me and Experience sections."
      },
      {
        "label": "Feature",
        "desc": "Added links to GitHub and LinkedIn."
      }
    ]
  }
];

export default versions;
