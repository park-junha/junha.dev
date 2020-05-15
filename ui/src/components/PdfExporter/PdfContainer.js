import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <div className="centered-text">(Note: The Download as PDF feature is still experimental and may not work as expected.)</div>
      <section className="pdf-toolbar centered-horizontally">
        <button onClick={createPdf}>Download as PDF</button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}
