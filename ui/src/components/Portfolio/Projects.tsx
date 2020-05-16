import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Button
, Modal
} from 'react-bootstrap';

import HandleApi from '../ApiHandlers/HandleApi';
import {
  ProjectData
, Project
, LanguageIds
} from '../../interfaces/Api';

interface Props {
  api_status: number;
  projects: ProjectData;
  languages: LanguageIds;
}

interface State {
  showModal: boolean;
  onDisplay: Project;
}

export default class Projects extends Component<Props, State> {
  state: State = {
    showModal: false
    //  Fill in with empty Project interface
    //  Is there a better way to do this?
  , onDisplay: {
      name: ''
    , languages: []
    , desc: ''
    , about: null
    , app: null
    , src: null
    }
  }

  showModal = (id: number): void => {
    this.setState({
      showModal: true
    , onDisplay: this.props.projects[id]
    });
  }

  hideModal = (): void => {
    this.setState({
      showModal: false
    });
  }

  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h2>Projects</h2>
              <br />
              {/* Handle empty projects prop */}
              {this.props.projects.length > 0 ? (
                this.props.projects.map((project, index: number) => (
                  <Button
                    className='project-card'
                    variant='secondary'
                    onClick={() => this.showModal(index)}
                  >
                    <div className='project-card-contents'>
                      <h6
                        className='project-card-header'
                      >{project.name}</h6>
                      <div
                        className='project-card-text'
                      >
                        {project.desc}
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <HandleApi
                  status={this.props.api_status}
                  success_msg='No data found.'
                />
              )}
            </Col>
            <Col />
          </Row>
        </Container>
        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
        >
          <Modal.Header
            className='project-modal'
            closeButton
          >
            <h4>{this.state.onDisplay.name}</h4>
          </Modal.Header>
          <Modal.Body
            className='project-modal'
          >
            <h5>About</h5>
            <p>
              {this.state.onDisplay.about ?
                this.state.onDisplay.about :
                'No description available.'
              }
            </p>
            <p>
              {this.state.onDisplay.app ? (
                <div>
                  View <i>{this.state.onDisplay.name + ' '}</i>
                  <a
                    href={this.state.onDisplay.app}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    here
                  </a>
                  .
                </div>
              ) : 
              'No demo available.'
              }{' '}
              {this.state.onDisplay.src ? (
                <div className='project-modal-src-link'>
                  (
                  <a
                    href={this.state.onDisplay.src}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    source code
                  </a>
                  )
                </div>
              ) : ( 
              <div className='project-modal-src-link'>
                (source code unavailable)
              </div>
              )}
            </p>
            <h5>Languages</h5>
            {this.state.onDisplay.languages.map(language_id => (
              <div>
                <span
                  className='project-language-color'
                  style={{
                    backgroundColor: this.props.languages[language_id].color
                  }}
                >
                </span>
                <span>
                  {this.props.languages[language_id].name}
                </span>
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
