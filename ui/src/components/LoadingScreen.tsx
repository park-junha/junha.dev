import React, {
  Component
} from 'react';
import { Spinner } from 'react-bootstrap';

export default class LoadingScreen extends Component {
  render () {
    return (
      <div className='fadein centered spinner'>
        <Spinner animation='border' variant='light'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    );
  };
}
