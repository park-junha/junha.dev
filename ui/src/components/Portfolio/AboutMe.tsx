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
                  <p>I&#39;m a software engineer interested in Full Stack Development, Process Automation, and Cloud Computing. My primary technologies are Python and JavaScript, but I have a variety of niche skills as well, including React, TypeScript, Shell Scripting, and the many variations of SQL.</p>
                  <p>Outside of software development, I love browsing YouTube / Netflix, listening to music, playing video games, and speedcubing.</p>
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
