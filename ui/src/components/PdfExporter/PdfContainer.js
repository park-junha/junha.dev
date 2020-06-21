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
            variant='danger'
            className='transparent-dark'
            style={{
              margin: '0px 4px'
            }}
          >
            View PDF
          </Button>
        </a>
        <Button
          variant='secondary'
          className='transparent-dark'
          style={{
            margin: '0px 4px'
            , display: 'none'
          }}
          onClick={createPdf}
        >
          Download PDF
        </Button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}
