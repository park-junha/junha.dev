import React, { Component } from 'react';
import {
  Container
, Row
, Col
} from 'react-bootstrap';

import { VersionData } from '../interfaces/Api';

interface Props {
  versionData: VersionData;
}

export default class VersionLog extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12} sm={10} md={8} lg={6}>
              <h2>Release Notes</h2>
              <h6>(view <a href='https://github.com/park-junha/PersonalWebsite' target='_blank' rel='noopener noreferrer'>source code</a>)</h6>
              {this.props.versionData.map(release => (
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
              ))}
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
