import React, {
  Component
} from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import {
  ApiData
, ProjectsApi
, GQLRequest
} from './interfaces/Api';

import './App.css';
import versions from './versions'

const currentVersion = versions[0]['version'];
const API_URL = 'https://i1mxgd4l94.execute-api.us-west-1.amazonaws.com/dev/';

interface State {
  component: string;
  api: ApiData;
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
    //  Initializing API data state
    //  Is there a better way to do this?
  , api: {
      'Projects': {
        'projects': []
      , 'status': 0
      }
    }
  };

  async componentDidMount(): Promise<void> {
    const projs = await this.fetchApi<ProjectsApi>(API_URL, {
      query: "{ projects { project_id title description about url source_code_url languages { name color } tools { name color } } }"
    });
    this.setState(prevState => ({
      api: {
        ...prevState.api
      , 'Projects': projs
      }
    }));
  };

  async fetchApi<T>(
    request: RequestInfo
  , body: GQLRequest
  ): Promise<T> {
    const res = await fetch(request, {
      method: 'POST'
    , headers: {
        'Content-Type': 'application/json'
      }
    , body: JSON.stringify(body)
    });
    const api = await res.json();
    api.data.status = res.status;
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
