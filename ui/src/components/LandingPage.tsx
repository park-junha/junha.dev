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
                <div>
                  <Button
                    className='landing-button-big'
                    size='lg'
                    variant='secondary'
                    onClick={() => this.props.changeComponent('Resume')}
                  >
                    Resume
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
                    onClick={() => this.props.changeComponent('Contact')}
                  >
                    Contact
                  </Button>
                </div>
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
                </div>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
