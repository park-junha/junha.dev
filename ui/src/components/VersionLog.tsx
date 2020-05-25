import React, { Component } from 'react';
import {
  Container
, Row
, Col
, Button
, Modal
} from 'react-bootstrap';

import { Version } from '../interfaces/Api';
import HandleApi from './ApiHandlers/HandleApi';
import versions from '../versions';

interface State {
  showModal: boolean;
  onDisplay: Version;
}

export default class VersionLog extends Component<{}, State> {
  state: State = {
    showModal: false
    //  Fill in with empty Version interface
    //  Is there a better way to do this?
  , onDisplay: {
      version: ''
    , notes: []
    }
  }

  showModal = (id: number): void => {
    this.setState({
      showModal: true
    , onDisplay: versions[id]
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
            <Col xs={13}>
              <h2>Release Notes</h2>
              <h6>
                (view <a href='https://github.com/park-junha/PersonalWebsite' target='_blank' rel='noopener noreferrer'>source code</a>)
              </h6>
              <div>
                <a href="https://2vkt8q67vg.execute-api.us-west-1.amazonaws.com/dev"><img alt="API Status" src="https://img.shields.io/website?down_color=red&down_message=offline&label=api&up_message=online&url=https%3A%2F%2F2vkt8q67vg.execute-api.us-west-1.amazonaws.com/dev" className='shields-io' /></a>
                <a href="https://lgtm.com/projects/g/park-junha/PersonalWebsite/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/park-junha/PersonalWebsite.svg?logo=lgtm&logoWidth=18" className='shields-io' /></a>
                <a href="https://lgtm.com/projects/g/park-junha/PersonalWebsite/context:python"><img alt="Language grade: Python" src="https://img.shields.io/lgtm/grade/python/g/park-junha/PersonalWebsite.svg?logo=lgtm&logoWidth=18" className='shields-io' /></a>
              </div>
              {versions.length > 0 ? (
                versions.map((release, index: number) => (
                  <Button
                    className={
                      index === 0
                      ?
                      'landing-button-big' :
                      'landing-button'
                    }
                    size='lg'
                    variant={
                      index === 0
                      ?
                      'primary' : (
                        release.version.split('.')[0] ===
                        versions[1].version.split('.')[0]
                        &&
                        release.version.split('.')[1] ===
                        versions[1].version.split('.')[1]
                        ?
                        'secondary' :
                        'dark'
                      )
                    }
                    onClick={() => this.showModal(index)}
                  >
                    {release.version}
                  </Button>
                ))
              ) : (
                <HandleApi
                  status={200}
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
            <h4>
              {
                this.state.onDisplay.version.split('.')[2] === '0' ?
                'Release ' :
                'Patch '
              }
              {this.state.onDisplay.version}
            </h4>
          </Modal.Header>
          <Modal.Body
            className='project-modal'
          >
            <ul>
            {this.state.onDisplay.notes.map(note => (
              <li>
                <strong>{note.label}</strong>: {note.desc}
              </li>
            ))}
            </ul>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
