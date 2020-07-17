import React, {
  Component
} from 'react';
import {
  Alert
} from 'react-bootstrap';

export default class Header extends Component {
  render () {
    return (
      <Alert variant='info' className='header-styles'>
        You are viewing an older version of the website -
        check out the new version {' '}
        <Alert.Link href="https://junha.dev">here</Alert.Link>.
      </Alert>
    );
  };
}
