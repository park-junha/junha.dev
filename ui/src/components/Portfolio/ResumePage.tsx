import React, { Component } from 'react';
import Resume from './Resume';

export default class ResumePage extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein'>
        <Resume />
      </div>
    );
  };
}
