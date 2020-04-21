import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
} from 'react-bootstrap';

export default class AboutMe extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container fluid>
          <Row>
            <Col />
            <Col sm={10} md={8} lg={6}>
              <h2 className='centered-text'>About Me</h2>
              <Card
                bg='dark'
              >
                <Card.Body>
                  <h4>Hi. My name is Junha Park.</h4>
                  <p>I&#39;m a seasoned software engineer based in the Bay Area. My primary technologies are <strong>Python</strong> and <strong>JavaScript</strong>, and I specialize in <strong>Full Stack Development</strong>, <strong>Process Automation</strong>, and <strong>Cloud Computing</strong>.</p>
                  <p>These are my interests and hobbies: <i>listening to music</i>, <i>fashion</i>, <i>twisty cube puzzles</i>, and <i>video games</i>.</p>
                  <p>That&#39;s all for now, more to come soon!</p>
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
