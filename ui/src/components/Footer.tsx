import React, { Component } from 'react';
import {
  Dropdown,
  Nav,
  Navbar
} from 'react-bootstrap';
import './Footer.css';

export default class Footer extends Component {
  render () {
    return (
      <div>
        <Navbar
          className='CustomNavbar'
          fixed='bottom'
          bg='dark'
          variant='dark'
        >
          <Nav className='justify-content-left'>
            <Nav.Item>
              <Dropdown
                drop='up'
              >
                <Dropdown.Toggle
                  id='navbar-main'
                  variant='dark'
                  title='Main'
                  className='CustomDropdownToggle'
                >
                  Home
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className='CustomDropdownMenu'
                >
                  <Dropdown.Item
                    className='CustomDropdownItem'
                  >
                    About Me
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
    );
  };
}
