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
  api_status: number;
}

//const API_URL = 'https://2vkt8q67vg.execute-api.us-west-1.amazonaws.com/dev';
const API_URL = 'http://localhost:3080';

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
  , api: data
  , api_status: 0
  };

  async componentDidMount(): Promise<void> {
    const api = await this.fetchApi<Api>(API_URL);
    if (this.state.api_status === 200 && api.result.length > 0) {
      this.setState({
        api: api.result[0]
      });
    }
  };

  async fetchApi<T>(
    request: RequestInfo
  ): Promise<T> {
    this.setState({
      api_status: 0
    });
    const res = await fetch(request);
    this.setState({
      api_status: res.status
    });
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
          api_status={this.state.api_status}
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
