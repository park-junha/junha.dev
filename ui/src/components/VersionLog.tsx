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
              <h6>(view <a href='https://github.com/park-junha/PersonalWebsite' target='_blank' rel='noopener noreferrer'>source code</a>)</h6>
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
                  statuses={[]}
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
