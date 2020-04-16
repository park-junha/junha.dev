import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
, Accordion
} from 'react-bootstrap';

interface Props {
  defaultKey: string;
  experience: Experiences;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  body: string;
}

interface Experiences extends Array<Experience>{};

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
                      className='card-header'
                      eventKey={exp.id}
                    >
                      <div className='card-header-left'>
                        <strong>{exp.title}</strong>, {exp.company}
                      </div>
                      <div className='card-header-right'>
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
