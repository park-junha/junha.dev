import React, { Component } from 'react';
import {
  Dropdown,
  Nav,
  Navbar
} from 'react-bootstrap';

interface Props {
  changeComponent: (newComponent: string) => void;
}

export default class Footer extends Component<Props, {}> {
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
                  Portfolio
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className='CustomDropdownMenu'
                >
                  <Dropdown.Item
                    className='CustomDropdownItem'
                    onClick={() => this.props.changeComponent('AboutMe')}
                  >
                    About Me
                  </Dropdown.Item>
                  <Dropdown.Item
                    className='CustomDropdownItem'
                    onClick={() => this.props.changeComponent('Experience')}
                  >
                    Experience
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className='CustomDropdownItem'
                    disabled
                  >
                    More to Come!
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              1.0.0
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}
