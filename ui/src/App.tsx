import React, {
  Component
} from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import { Api } from './interfaces/Api';

//  Not real API, storing data in JSON file for now
import { data } from './data';

import './App.css';

interface State {
  component: string;
  api: Api;
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
  , api: data
  };

/*
  async componentDidMount(): Promise<void> {
    await this.setState({
      api: this.fetchApi()
    });
  };

  fetchApi = (): Api => {
    return data;
  };
*/

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
