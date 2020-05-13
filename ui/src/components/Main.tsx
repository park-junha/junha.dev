import React, {
  Component
, Suspense
, lazy
} from 'react';
import LoadingScreen from './LoadingScreen';

import { ApiData } from '../interfaces/Api';

interface Props {
  api: ApiData;
  api_status: number;
  component: string;
  changeComponent: (newComponent: string) => void;
}

const LandingPage = lazy( () => import('./LandingPage'));
const AboutMe = lazy( () => import('./Portfolio/AboutMe'));
const Resume = lazy( () => import('./Portfolio/Resume'));
const Projects = lazy( () => import('./Portfolio/Projects'));

const VersionLog = lazy( () => import('./VersionLog'));
const NotFound = lazy( () => import('./404'));

export default class Main extends Component<Props> {
  renderComponent = (component: string): JSX.Element => {
    switch (component) {
      case 'LandingPage':
        return (
          <LandingPage
            changeComponent={this.props.changeComponent}
          />
        );
      case 'AboutMe':
        return (
          <AboutMe />
        );
      case 'Resume':
        return (
          <Resume />
        );
      case 'Projects':
        return (
          <Projects
            api_status={this.props.api_status}
            projects={this.props.api.Projects}
            languages={this.props.api.language_ids}
          />
        );
      case 'VersionLog':
        return (
          <VersionLog
            api_status={this.props.api_status}
            versionData={this.props.api.Versions}
          />
        );
      default:
        return (
          <NotFound />
        );
    }
  };

  render (): JSX.Element {
    return (
      <div className='Main'>
        <Suspense fallback={
          <div>
            <LoadingScreen centered/>
          </div>
        }>
          { this.renderComponent(this.props.component) }
        </Suspense>
      </div>
    );
  };
}
