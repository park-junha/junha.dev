import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
} from 'react-bootstrap';

import {
  ProjectData
, LanguageIds
} from '../../interfaces/Api';

interface Props {
  projects: ProjectData;
  languages: LanguageIds;
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
              <Card
                bg='dark'
              >
              </Card>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
