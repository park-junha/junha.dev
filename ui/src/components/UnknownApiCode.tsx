import React, {
  Component
} from 'react';
import {
  Container
, Row
, Col
, Card
} from 'react-bootstrap';

interface Props {
  status?: number;
}

export default class UnknownApiCode extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding centered-text'>
        <Container>
          <Row>
            <Col />
            <Col xs={5}>
              <h1>{this.props.status ? this.props.status : 'Error'}</h1>
              <Card
                bg='warning'
              >
                <Card.Body>
                  <h4>We&#39;re not sure what happened.</h4>
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
