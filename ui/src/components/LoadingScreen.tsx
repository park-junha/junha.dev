import React, {
  Component
} from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {
  centered?: boolean;
}

export default class LoadingScreen extends Component<Props> {
  render () {
    return (
      <div
        className={this.props.centered ?
          'fadein spinner centered' :
          'fadein spinner'
        }
      >
        <Spinner animation='border' variant='light'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    );
  };
}
