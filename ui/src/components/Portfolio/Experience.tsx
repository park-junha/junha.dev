import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Accordion
} from 'react-bootstrap';

/*
Note: Using target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopener
*/

export default class Experience extends Component {
  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col sm={12} md={9} lg={7}>
              <h2 className='centered-text'>Professional Experience</h2>
              <Accordion defaultActiveKey='IO'>
                <Card
                  bg='dark'
                >
                  <Accordion.Toggle
                    as={Card.Header}
                    className='card-header'
                    eventKey='HCL'
                  >
                    <div className='card-header-left'>
                      <strong>Software Engineer</strong>, HCL Technologies
                    </div>
                    <div className='card-header-right'>
                      May &#39;20 - Current
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='HCL'>
                    <Card.Body>
                      <p>Starting May 2020.</p>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card
                  bg='dark'
                >
                  <Accordion.Toggle
                    as={Card.Header}
                    className='card-header'
                    eventKey='IO'
                  >
                    <div className='card-header-left'>
                      <strong>Full Stack Software Engineer</strong>, Infinite Options
                    </div>
                    <div className='card-header-right'>
                      Sep &#39;19 - May &#39;20
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='IO'>
                    <Card.Body>
                      {/*
                      <Card.Subtitle>
                        Web e-commerce Platform
                      </Card.Subtitle>
                      */}
                      <Card.Text>
                        <i>Software Team Lead</i> and <i>Full Stack Developer</i> for a Web-based, customer-facing e-commerce <a href='https://preptoyourdoor.netlify.com/' target='_blank' rel='noopener noreferrer'>platform</a>
                        <ul>
                          <li>Developed and scaled the web UI with <strong>React</strong> (a <strong>JavaScript</strong> web UI framework) and web APIs with <strong>Flask</strong> (a <strong>Python</strong> web framework)</li>
                          <li>Designed and developed a <strong>MySQL</strong> database and hosted it on <strong>AWS RDS</strong></li>
                          <li>Automated procedures and platform services with <strong>Python</strong> and <strong>Shell</strong> scripts</li>
                          <li>Performed <a href='https://github.com/infinite-options/Prep-To-Your-Door' target='_blank' rel='noopener noreferrer'>code</a> reviews, merge conflict resolutions, and rebases using <strong>Git</strong></li>
                          <li>Deployed APIs to a serverless <strong>AWS Lambda</strong> infrastructure using <strong>Zappa</strong> and the web UI to <strong>Netlify</strong></li>
                        </ul>
                        <i>Technologies Used:</i>
                        <ul>
                          <li><strong>Codebases</strong>: Python, JavaScript, Bash</li>
                          <li><strong>Databases</strong>: MySQL</li>
                          <li><strong>Web Frameworks</strong>: Flask, React</li>
                          <li><strong>Cloud Services</strong>: AWS, Netlify, Zappa</li>
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card
                  bg='dark'
                >
                  <Accordion.Toggle
                    as={Card.Header}
                    className='card-header'
                    eventKey='GP'
                  >
                    <div className='card-header-left'>
                      <strong>Advisor to the Board</strong>, Grad Planner
                    </div>
                    <div className='card-header-right'>
                      Sep &#39;19 - Current
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey='GP'>
                    <Card.Body>
                      <Card.Text>
                        <i>Founding Engineer</i> and <i>Technical Advisor</i> to the Board of Directors
                        <ul>
                          <li>Created a Web <a href='http://gradplanner.herokuapp.com/' target='_blank' rel='noopener noreferrer'>resource</a> to assist undergraduate students graduate on time, prototyped using the <strong>LAMP</strong> (<strong>Python</strong>) stack</li>
                          <li>Directed the team to migrate the software to an MVC model with a <strong>React</strong> UI, <strong>Flask</strong> APIs, and a <strong>PostgreSQL</strong> database</li>
                          <li>Performed code reviews, merge conflict resolutions, task management, and interactive rebases using <strong>Git</strong> and <strong>GitHub</strong></li>
                          <li>Conducted technical interviews to onboard new interns and employees</li>
                        </ul>
                        <i>Technologies Used:</i>
                        <ul>
                          <li><strong>Codebases</strong>: Python, JavaScript</li>
                          <li><strong>Databases</strong>: MySQL, PostgreSQL</li>
                          <li><strong>Web Frameworks</strong>: Flask, React</li>
                          <li><strong>Cloud Services</strong>: AWS, Heroku</li>
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
