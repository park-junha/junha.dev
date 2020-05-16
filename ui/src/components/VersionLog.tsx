import React, { Component } from 'react';
import {
  Container
, Row
, Col
} from 'react-bootstrap';

import { VersionData } from '../interfaces/Api';
import HandleApi from './ApiHandlers/HandleApi';

interface Props {
  api_status: number;
  versionData: VersionData;
}

export default class VersionLog extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h2>Release Notes</h2>
              <h6>(view <a href='https://github.com/park-junha/PersonalWebsite' target='_blank' rel='noopener noreferrer'>source code</a>)</h6>
              {this.props.versionData.length > 0 ? (
                this.props.versionData.map(release => (
                  <div>
                    <h4>{release.version}</h4>
                    <ul>
                    {release.notes.map(note => (
                      <li>
                        <strong>{note.label}</strong>: {note.desc}
                      </li>
                    ))}
                    </ul>
                  </div>
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
      </div>
    );
  };
}
