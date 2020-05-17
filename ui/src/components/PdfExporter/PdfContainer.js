import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar centered-horizontally">
        <a
          href='https://junha-park.s3-us-west-1.amazonaws.com/Resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            variant='secondary'
            style={{
              margin: '0px 4px'
            }}
          >
            View PDF (AWS)
          </Button>
        </a>
        <a
          href='https://www.dropbox.com/s/ec06jhsa72yc4wf/ResumeJunhaPark.pd    f?dl=0'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            variant='secondary'
            style={{
              margin: '0px 4px'
            }}
          >
            View PDF (Dropbox)
          </Button>
        </a>
        {/*
        <Button
          variant='secondary'
          style={{
            margin: '0px 4px'
          }}
          onClick={createPdf}
          disabled
        >
          Download as PDF
        </Button>
        */}
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}
