import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
} from 'react-bootstrap';

export default class Contact extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={10} sm={9} md={7} lg={5}>
              <h2 className='centered-text'>Contact Me</h2>
              <Card
                className='transparent-dark'
                bg='dark'
              >
                <Card.Body>
                  <p>The best ways to reach me are:</p>
                  <ul>
                    <li><strong>Email</strong>:{' '}
                      <a
                        href='mailto:jpark3@scu.edu'
                      >
                        jpark3@scu.edu
                      </a>
                    </li>
                    <li><strong>LinkedIn</strong>:{' '} 
                      <a
                        href='https://www.linkedin.com/in/park-junha/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        linkedin.com/in/park-junha
                      </a>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
