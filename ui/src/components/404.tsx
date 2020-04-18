import React, {
  Component
} from 'react';
import {
  Container
, Row
, Col
, Card
} from 'react-bootstrap';

export default class NotFound extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding centered-text'>
        <Container>
          <Row>
            <Col />
            <Col xs={5}>
              <h1>404</h1>
              <Card
                bg='danger'
              >
                <Card.Body>
                  <h4>Oops. Something went wrong.</h4>
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
