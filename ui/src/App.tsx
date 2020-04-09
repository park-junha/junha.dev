import React, {
  Component
} from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';

interface State {
  component: string;
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
  };

  changeComponent = (newComponent: string): void => {
    this.setState({
      component: newComponent,
    });
  };

  public render (): JSX.Element {
    return (
      <div className='App'>
        <Main component={this.state.component} />
        <Footer changeComponent={this.changeComponent}/>
      </div>
    );
  };
}

export default App;
