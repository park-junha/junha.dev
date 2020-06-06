import React, {
  Component
} from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import {
  ApiData
, ProjectsApi
, LanguageIdsApi
, ToolIdsApi
, GQLRequest
} from './interfaces/Api';

import './App.css';
import versions from './versions'

const currentVersion = versions[0]['version'];
//const API_URL = 'https://2vkt8q67vg.execute-api.us-west-1.amazonaws.com/dev';
const API_URL = 'http://localhost:2000/'

interface State {
  component: string;
  api: ApiData;
  api_status: number;
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
    //  Initializing API data state
    //  Is there a better way to do this?
  , api: {
      'Projects': []
    , 'language_ids': []
    , 'tool_ids': []
    }
  , api_status: 0
  };

  async componentDidMount(): Promise<void> {
    const projs = await this.fetchApi<ProjectsApi>(API_URL, {
      query: "{ projects { uid name desc about app src languages tools } }"
    });
    const langs = await this.fetchApi<LanguageIdsApi>(API_URL, {
      query: "{ languages { uid name color } }"
    });
    const tools = await this.fetchApi<ToolIdsApi>(API_URL, {
      query: "{ tools { uid name color } }"
    });
    if (this.state.api_status === 200
      && projs.projects.length > 0
      && langs.languages.length > 0
      && tools.tools.length > 0
    ) {
      this.setState({
        api: {
          'Projects': projs.projects
        , 'language_ids': langs.languages
        , 'tool_ids': tools.tools
        }
      });
    }
  };

  async fetchApi<T>(
    request: RequestInfo
  , body: GQLRequest
  ): Promise<T> {
    this.setState({
      api_status: 0
    });
    const res = await fetch(request, {
      method: 'POST'
    , headers: {
        'Content-Type': 'application/json'
      }
    , body: JSON.stringify(body)
    });
    this.setState({
      api_status: res.status
    });
    const api = await res.json();
    return api.data;
  }

  changeComponent = (newComponent: string): void => {
    this.setState({
      component: newComponent
    });
  };

  public render (): JSX.Element {
    return (
      <div className='App'>
        <Main
          api={this.state.api}
          api_status={this.state.api_status}
          component={this.state.component}
          changeComponent={this.changeComponent}
        />
        <Footer
          changeComponent={this.changeComponent}
          currentVersion={currentVersion}
        />
      </div>
    );
  };
}

export default App;
