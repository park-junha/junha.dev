import React, {
  Component,
  Suspense,
  lazy
} from 'react';
import LoadingScreen from './LoadingScreen';

interface Props {
  component: string;
}

const LandingPage = lazy( () => import('./LandingPage'));
const AboutMe = lazy( () => import('./Portfolio/AboutMe'));
const Experience = lazy( () => import('./Portfolio/Experience'));
const NotFound = lazy( () => import('./404'));

function renderComponent (component: string): JSX.Element {
  switch (component) {
    case 'LandingPage':
      return (
        <LandingPage />
      );
    case 'AboutMe':
      return (
        <AboutMe />
      );
    case 'Experience':
      return (
        <Experience />
      );
    default:
      return (
        <NotFound />
      );
  }
};

export default class Main extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='Main'>
        <Suspense fallback={<LoadingScreen />}>
          { renderComponent(this.props.component) }
        </Suspense>
      </div>
    );
  };
}
