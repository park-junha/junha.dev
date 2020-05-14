import React, { Component } from 'react';
import Resume from './Resume';

import downloadAsPdf from '../downloadAsPdf';

export default class ViewResume extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein'>
        {/* Experimental Download as PDF
        <button onClick={() => downloadAsPdf('the-resume')}>Download as PDF</button>
        */}
        <Resume id='the-resume' />
      </div>
    );
  };
}
