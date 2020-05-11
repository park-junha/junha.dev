import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Card
, Nav
} from 'react-bootstrap';

//  Deprecated CSS for Skills component
import './Skills.css';

interface Props {
  technicalSkills: Skillsets;
}

/*  Deprecated interfaces in Api.ts
import {
  Skillsets
, Skills
} from '../../interfaces/Api';
*/

//  Originally from Api.ts
interface State {
  skills: Skills;
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
//  End of former Api.ts contents

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
              {/*<li>Proficiency Level: {skill.level}</li>*/}
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
            <Col sm={12} md={10} xl={8}>
              <h2 className='centered-text'>Technical Skills</h2>
              <Card
                bg='dark'
              >
                <Card.Header>
                  <Nav fill variant='tabs'>
                  {this.props.technicalSkills.map(technicalSkill => (
                    <Nav.Item
                    >
                      <Nav.Link
                        onClick={() => this.changeBody(technicalSkill.skills)}
                        className='navtab-custom'
                      >
                        {technicalSkill.skillset}
                      </Nav.Link>
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
