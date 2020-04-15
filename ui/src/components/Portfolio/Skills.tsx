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
            <Col sm={12} md={9} lg={7}>
              <h2 className='centered-text'>Technical Skills</h2>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
