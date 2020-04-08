import React, { Component } from 'react';
import { Nav, Navbar } from "react-bootstrap";

export default class Footer extends Component {
  render () {
    return (
      <div>
        <Navbar expand="md" fixed="bottom" bg="dark" variant="dark">
          <Nav className="justify-content-left" variant="pills">
            <Nav.Item>
              <Nav.Link disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  };
}
