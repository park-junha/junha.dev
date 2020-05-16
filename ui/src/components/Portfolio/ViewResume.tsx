import React, { Component } from 'react';
import Resume from './Resume';

import Doc from '../PdfExporter/DocService';
import PdfContainer from '../PdfExporter/PdfContainer';
import './DejaVuSerif.css';

export default class ViewResume extends Component {
  createPdf = (html: HTMLElement) => Doc.createPdf(html);

  render (): JSX.Element {
    return (
      <div className='fadein'>
        {/*
        <PdfContainer createPdf={this.createPdf}>
        */}
          <Resume id='the-resume' />
        {/*
        </PdfContainer>
        */}
      </div>
    );
  };
}
