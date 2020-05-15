import React, { Component } from 'react';
import Resume from './Resume';

export default class ViewResume extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein'>
        <Resume id='the-resume' />
      </div>
    );
  };
}
