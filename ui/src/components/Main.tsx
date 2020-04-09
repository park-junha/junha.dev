import React, {
  Component,
  Suspense,
  lazy
} from 'react';
import LoadingPage from './LoadingPage';
import './Main.css';

interface Props {
  component: string;
}

const LandingPage = lazy( () => import('./LandingPage'));
const NotFound = lazy( () => import('./404'));

function renderComponent (component: string): JSX.Element {
  switch (component) {
    case 'LandingPage':
      return (
        <LandingPage />
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
      <div>
        <Suspense fallback={<LoadingPage />}>
          { renderComponent(this.props.component) }
        </Suspense>
      </div>
    );
  };
}
