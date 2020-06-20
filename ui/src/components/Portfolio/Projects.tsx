import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Button
, Modal
} from 'react-bootstrap';

import LoadingScreen from '../LoadingScreen';
import {
  ProjectsApi
, Project
} from '../../interfaces/Api';

interface Props {
  projects: ProjectsApi;
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
      title: ''
    , languages: []
    , tools: []
    , description: ''
    , about: null
    , url: null
    , source_code_url: null
    }
  }

  showModal = (id: number): void => {
    this.setState((state, props) => ({
      showModal: true
    , onDisplay: props.projects.projects[id]
    }));
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
              {this.props.projects.status === 200 ? (
                this.props.projects.projects.map((project, index: number) => (
                  <Button
                    className='project-card'
                    variant='secondary'
                    onClick={() => this.showModal(index)}
                  >
                    <div className='project-card-contents'>
                      <h6
                        className='project-card-header'
                      >{project.title}</h6>
                      <div
                        className='project-card-text'
                      >
                        {project.description}
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <LoadingScreen />
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
            <h4>{this.state.onDisplay.title}</h4>
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
              {this.state.onDisplay.url ? (
                <div>
                  View <i>{this.state.onDisplay.title + ' '}</i>
                  <a
                    href={this.state.onDisplay.url}
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
              {this.state.onDisplay.source_code_url ? (
                <div className='project-modal-src-link'>
                  (
                  <a
                    href={this.state.onDisplay.source_code_url}
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
            {this.state.onDisplay.languages.map(language => (
              <div>
                <span
                  className='project-language-color'
                  style={{
                    backgroundColor: language.color ?? '#ededed'
                  }}
                >
                </span>
                <span>
                  {language.name ?? 'N/A'}
                </span>
              </div>
            ))}
            {this.state.onDisplay.tools.length > 0 ? (
              <div>
                <br />
                <h5>Other Technologies</h5>
                {this.state.onDisplay.tools.map(tool => (
                  <div>
                    <span
                      className='project-language-color'
                      style={{
                        backgroundColor: tool.color ?? '#ededed'
                      }}
                    >
                    </span>
                    <span>
                      {tool.name ?? 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            ) : null
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
