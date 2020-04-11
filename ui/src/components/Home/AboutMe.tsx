import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card
} from 'react-bootstrap';

export default class AboutMe extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={6}>
              <h2 className='centered-text'>About Me</h2>
              <Card
                bg='dark'
              >
                <Card.Body>
                  <h4>Hi. My name is Junha Park.</h4>
                  <p>I&#39;m a software engineer interested in Full Stack Development, Process Automation, and Agile Methodologies. My primary technologies are Python and JavaScript, but I have a variety of niche skills as well, including Bash, TypeScript, C, and the many variations of SQL.</p>
                  <p>Outside of software development, I love surfing the Internet, playing video games, listening to music, and speedcubing.</p>
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
