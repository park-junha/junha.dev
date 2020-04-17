import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
, Nav
} from 'react-bootstrap';

import {
  Skillsets
, Skills
} from '../../interfaces/Api';

interface Props {
  technicalSkills: Skillsets;
}

interface State {
  skills: Skills;
}

export default class TechnicalSkills extends Component<Props, State> {
  state: State = {
//  skills: this.props.technicalSkills[0].skills,
    skills: []
  };

  displaySkills = (skills: Skills): JSX.Element => {
    return (
      <div>
        {skills.map(skill => (
          <div>
            <h5>{skill.name}</h5>
            <ul>
              <li>Proficiency Level: {skill.level}</li>
              <li>{skill.desc}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  };

  changeBody = (newSkills: Skills): void => {
    this.setState({
      skills: newSkills,
    });
  };

  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col sm={12} md={10} lg={8}>
              <h2 className='centered-text'>Technical Skills</h2>
              <Card
                bg='dark'
              >
                <Card.Header>
                  <Nav variant='tabs'>
                  {this.props.technicalSkills.map(technicalSkill => (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => this.changeBody(technicalSkill.skills)}
                      >
                        {technicalSkill.skillset}
                      </Nav.Link>
                    {/*
                      <ul>
                        {technicalSkill.skills.map(skill => (
                          <div>
                            <li>{skill.name}</li>
                            <ul>
                              <li>Proficiency Level: {skill.level}</li>
                              <li>{skill.desc}</li>
                            </ul>
                          </div>
                        ))}
                      </ul>
                    */}
                    </Nav.Item>
                  ))}
                  </Nav>
                </Card.Header>
                <Card.Body>
                  { this.displaySkills(this.state.skills) }
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
