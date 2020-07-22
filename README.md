## Personal Website

[![Website status](https://img.shields.io/website?down_color=red&down_message=offline&label=website&up_message=online&url=https%3A%2F%2Fjunha.netlify.com)](https://junha.netlify.app/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/github/park-junha/PersonalWebsite.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/park-junha/PersonalWebsite/context:javascript)
[![Go Report Card](https://goreportcard.com/badge/github.com/park-junha/PersonalWebsite)](https://goreportcard.com/report/github.com/park-junha/PersonalWebsite)

Source code for personal website, developed on a full solution stack.

### Software Stack

**Web UI**: Angular (TypeScript)

**Web API**: GraphQL (Go)

**Database**: PostgreSQL

**Cloud**: Netlify, AWS Lambda

## Available Scripts

### `./run.sh`

This will run all web components in development mode by default.

You may use the following options to customize your development app:

#### `-a, --api-only`

Run web backend only.

#### `-u, --ui-only`

Run web frontend only.

#### `-p, --production-mode`

Run the web frontend with a production environment. This will **not** run the web backend, as the development frontend will make calls to the live web API instead.

#### `-h, --host-ip`

Host the web frontend on your machine's local IP address. This will make your frontend accessible to other machines within your LAN (such as your mobile device or devices running on other operating systems).
