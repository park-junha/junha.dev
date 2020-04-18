import React, { Component } from 'react';
import {
  Container
, Row
, Col
} from 'react-bootstrap';

import { ProjectData } from '../../interfaces/Api';

interface Props {
  projects: ProjectData
}

export default class Projects extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col sm={10} md={8} lg={6}>
              <h2 className='centered-text'>Projects</h2>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
