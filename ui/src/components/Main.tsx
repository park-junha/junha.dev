import React, {
  Component,
  Suspense,
  lazy
} from 'react';
import LoadingScreen from './LoadingScreen';

//  Not real API, storing data in JSON file for now
import data from '../data';

interface Props {
  component: string;
  changeComponent: (newComponent: string) => void;
}

//  API interfaces
interface Api {
  TechnicalSkills: Skillsets;
}

interface Skillset {
  skillset: string;
  skills: Skills;
}

interface Skill {
  name: string;
  level: number;
  desc: string;
}

interface Skillsets extends Array<Skillset>{};
interface Skills extends Array<Skill>{};

const LandingPage = lazy( () => import('./LandingPage'));
const AboutMe = lazy( () => import('./Portfolio/AboutMe'));
const Experience = lazy( () => import('./Portfolio/Experience'));
const Skills = lazy( () => import('./Portfolio/Skills'));
const NotFound = lazy( () => import('./404'));

export default class Main extends Component<Props> {
  async componentDidMount(): Promise<void> {
    this.fetchApi();
  }

  fetchApi = (): Api => {
    console.log(data);
    return data;
  };

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
      case 'Skills':
        return (
          <Skills />
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
