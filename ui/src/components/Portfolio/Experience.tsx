import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
, Accordion
} from 'react-bootstrap';

import { Experiences } from '../../interfaces/Api';

interface Props {
  defaultKey: string;
  experience: Experiences;
}

export default class ProfessionalExperience extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col sm={12} md={9} lg={7}>
              <h2 className='centered-text'>Professional Experience</h2>
              <Accordion defaultActiveKey={this.props.defaultKey}>
                {this.props.experience.map(exp => (
                  <Card
                    bg='dark'
                  >
                    <Accordion.Toggle
                      as={Card.Header}
                      className='card-header-custom'
                      eventKey={exp.id}
                    >
                      <div className='card-header-custom-left'>
                        <strong>{exp.title}</strong>, {exp.company}
                      </div>
                      <div className='card-header-custom-right'>
                        {exp.start} - {exp.end}
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={exp.id}>
                      <Card.Body>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: exp.body
                          }}
                        ></div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
