import React, {
  Component,
  Suspense,
  lazy
} from 'react';
import LoadingScreen from './LoadingScreen';

interface Props {
  component: string;
  changeComponent: (newComponent: string) => void;
}

const LandingPage = lazy( () => import('./LandingPage'));
const AboutMe = lazy( () => import('./Portfolio/AboutMe'));
const Experience = lazy( () => import('./Portfolio/Experience'));
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

  render (): JSX.Element {
    return (
      <div className='Main'>
        <Suspense fallback={<LoadingScreen />}>
          { this.renderComponent(this.props.component) }
        </Suspense>
      </div>
    );
  };
}
