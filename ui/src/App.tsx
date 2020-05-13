import React, {
  Component
} from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import {
  Api
, ApiData
} from './interfaces/Api';

//  Not real API, storing data in JSON file for now
import { data } from './data';
import './App.css';

interface State {
  component: string;
  api: ApiData;
}

const API_URL = 'https://2vkt8q67vg.execute-api.us-west-1.amazonaws.com/dev';

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
  , api: data
  };

  async componentDidMount(): Promise<void> {
    const api = await this.fetchApi<Api>(API_URL);
    this.setState({
      api: api.result[0]
    });
  };

  async fetchApi<T>(
    request: RequestInfo
  ): Promise<T> {
    const res = await fetch(request);
    const api = await res.json();
    return api;
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
          currentVersion={this.state.api.Versions[0].version}
        />
      </div>
    );
  };
}

export default App;
