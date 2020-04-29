import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
, CardDeck
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
            <Col xs={12}>
              <h2>Projects</h2>
              <br />
              <CardDeck
              >
                {this.props.projects.map(project => (
                  <Card
                    bsPrefix='project-card'
                    bg='secondary'
                  >
                    <Card.Body>
                      <Card.Title>
                        {project.name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </CardDeck>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
