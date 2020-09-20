## Personal Website

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/park-junha/PersonalWebsite?color=brightgreen&label=latest)](https://github.com/park-junha/PersonalWebsite/releases)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/github/park-junha/PersonalWebsite.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/park-junha/PersonalWebsite/context:javascript)
[![Go Report Card](https://goreportcard.com/badge/github.com/park-junha/PersonalWebsite)](https://goreportcard.com/report/github.com/park-junha/PersonalWebsite)
[![Website](https://img.shields.io/website?down_message=offline&label=website%20v3.1&up_message=online&url=https%3A%2F%2Fjunha.dev)](https://junha.dev)
[![Legacy Website](https://img.shields.io/website?down_message=offline&label=website%20v2.2&up_color=yellow&up_message=deprecated&url=https%3A%2F%2Fjunha.netlify.app)](https://junha.netlify.app/)

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

#### `-h, --host-lan`

Host the web frontend on your machine's local IP address. This will make your frontend accessible to other machines within your LAN (such as your mobile device or devices running on other operating systems).

#### `-t, --test`

Run end-to-end tests and unit tests. This will also run the web backend before and during the tests.

#### `-e, --e2e`

Run end-to-end tests only. This will also run the web backend before and during the tests.
