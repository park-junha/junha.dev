import React, {
  Component
} from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingScreen.css'

export default class LoadingScreen extends Component {
  render () {
    return (
      <div className='centered'>
        <Spinner animation='border' variant='light'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    );
  };
}
