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
                className='transparent-dark'
                bg='dark'
              >
                <Card.Body>
                  <h4>Hi. My name is Junha Park.</h4>
                  <p>I&#39;m a software engineer based in the Bay Area specializing in <strong>Full Stack Development</strong>. My primary technologies are <strong>JavaScript</strong> and its various flavors and frameworks, including <strong>React</strong>, <strong>Angular</strong>, <strong>TypeScript</strong>, and <strong>Node.js</strong>. Outside of the JavaScript ecosystem, I also use <strong>Python</strong>, <strong>SQL</strong>, and <strong>Go</strong>.</p>
                  <p>These are some of my interests and hobbies: <i>listening to music</i>, <i>fashion</i>, <i><a href='https://www.worldcubeassociation.org/persons/2015PARK22' target='_blank' rel='noopener noreferrer'>twisty cube puzzles</a></i>, and <i>video games</i>.</p>
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
