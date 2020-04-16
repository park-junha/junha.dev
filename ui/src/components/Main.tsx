import React, {
  Component,
  Suspense,
  lazy
} from 'react';
import LoadingScreen from './LoadingScreen';

import { Api } from '../interfaces/Api';

//  Not real API, storing data in JSON file for now
import data from '../data';

interface Props {
  component: string;
  changeComponent: (newComponent: string) => void;
}

interface State {
  api: Api;
}
/*
//  API interfaces
interface Api {
  TechnicalSkills: Skillsets;
  ProfessionalExperience: ExperienceData;
}

interface ExperienceData {
  defaultKey: string;
  experience: Experiences;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  body: string;
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
interface Experiences extends Array<Experience>{};
*/
const LandingPage = lazy( () => import('./LandingPage'));
const AboutMe = lazy( () => import('./Portfolio/AboutMe'));
const ProfessionalExperience = lazy( () => import('./Portfolio/Experience'));
const TechnicalSkills = lazy( () => import('./Portfolio/Skills'));
const NotFound = lazy( () => import('./404'));

export default class Main extends Component<Props> {
  state: State = {
    api: {
      TechnicalSkills: [],
      ProfessionalExperience: {
        defaultKey: '',
        experience: [],
      },
    },
  };

  async componentDidMount(): Promise<void> {
    await this.setState({
      api: this.fetchApi(),
    });
  };

  fetchApi = (): Api => {
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
          <ProfessionalExperience
            {...this.state.api.ProfessionalExperience}
          />
        );
      case 'Skills':
        return (
          <TechnicalSkills
            technicalSkills={this.state.api.TechnicalSkills}
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
        <Suspense fallback={<LoadingScreen />}>
          { this.renderComponent(this.props.component) }
        </Suspense>
      </div>
    );
  };
}
