import React, { Component } from 'react';
import {
  Container
, Row
, Col
//, Card
} from 'react-bootstrap';

interface Props {
  technicalSkills: Skillsets;
}

interface Skillset {
  skillset: string;
  skills: Skills;
}

interface Skill {
  name: string;
  level: number;
  desc: string;
}

interface Skillsets extends Array<Skillset>{};
interface Skills extends Array<Skill>{};

export default class TechnicalSkills extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container fluid>
          <Row>
            <Col />
            <Col sm={12} md={9} lg={7}>
              <h2 className='centered-text'>Technical Skills</h2>
              {this.props.technicalSkills.map(technicalSkill => (
                <div>
                  <h4>{technicalSkill.skillset}</h4>
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
                </div>
              ))}
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
