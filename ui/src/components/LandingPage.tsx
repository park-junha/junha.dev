import React, {
  Component
} from 'react';
import {
  Container
, Button
, Row
, Col
} from 'react-bootstrap';
import {
  IoLogoGithub
, IoLogoLinkedin
, IoIosDocument
} from 'react-icons/io';

interface Props {
  changeComponent: (newComponent: string) => void;
}

export default class LandingPage extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1>Welcome</h1>
              <br />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col xs={12}>
              <div>
                <Button
                  className='landing-button-big'
                  size='lg'
                  variant='secondary'
                  onClick={() => this.props.changeComponent('AboutMe')}
                >
                  About Me
                </Button>
                <Button
                  className='landing-button-big'
                  size='lg'
                  variant='secondary'
                  onClick={() => this.props.changeComponent('Experience')}
                >
                  Experience
                </Button>
              </div>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col xs={12}>
              <div>
                <Button
                  className='landing-button-big'
                  size='lg'
                  variant='secondary'
                  onClick={() => this.props.changeComponent('Skills')}
                >
                  Skills
                </Button>
                <Button
                  className='landing-button-big'
                  size='lg'
                  variant='secondary'
                  onClick={() => this.props.changeComponent('Projects')}
                >
                  Projects
                </Button>
              </div>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col xs={12}>
              <div>
                <a
                  href='https://github.com/park-junha'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    className='landing-button'
                    size='lg'
                    variant='dark'
                  >
                    <IoLogoGithub />
                  </Button>
                </a>
                <a
                  href='https://www.linkedin.com/in/park-junha/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    className='landing-button'
                    size='lg'
                    variant='dark'
                  >
                    <IoLogoLinkedin />
                  </Button>
                </a>
                <a
                  href='https://www.linkedin.com/in/park-junha/detail/overlay-view/urn:li:fsd_profileTreasuryMedia:(ACoAAB-zIekBeFHkj6P_5coHKvtZ9HE6uuCdvnQ,1581373782830)/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    className='landing-button'
                    size='lg'
                    variant='dark'
                  >
                    <IoIosDocument />
                  </Button>
                </a>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
