import React, { Component } from 'react';
import img_linkedin from '../../img/logo-linkedin.png';
import img_github from '../../img/logo-github.png';
import img_website from '../../img/globe-outline.png';
import img_email from '../../img/mail.png';
import img_phone from '../../img/call.png';
import img_work from '../../img/briefcase.png';
import '../PdfExporter/ExportResumeStyle.css';

interface Props {
  id: string;
}

class Resume extends Component<Props> {
  render (): JSX.Element {
    return (
      <div className='resume' id={this.props.id}>
        <div className='resume-header'>
          <div className='resume-header-left'>
            <h2>Junha Park</h2>
            <h6>Full Stack Software Engineer</h6>
          </div>
          <div className='resume-header-right'>
            <div className='resume-header-right-left'>
              <img
                src={img_linkedin}
                alt="li"
                className='resume-header-logo'
              />
              <a
                href='https://www.linkedin.com/in/park-junha/'
                target='_blank'
                rel='noopener noreferrer'
              >
                linkedin.com/in/park-junha
              </a>
              <br />
              <img
                src={img_github}
                alt="gh"
                className='resume-header-logo'
              />
              <a
                href='https://github.com/park-junha'
                target='_blank'
                rel='noopener noreferrer'
              >
                github.com/park-junha
              </a>
              <br />
              <img
                src={img_website}
                alt="ws"
                className='resume-header-logo'
              />
              <a
                href='https://junha.dev/'
                target='_blank'
                rel='noopener noreferrer'
              >
                junha.dev
              </a>
            </div>
            <div className='resume-header-right-right'>
              <img
                src={img_email}
                alt="ml"
                className='resume-header-logo'
              />
              jpark3@scu.edu
              <br />
              <img
                src={img_phone}
                alt="ph"
                className='resume-header-logo'
              />
              (971) 230-8858
              <br />
              <img
                src={img_work}
                alt="wk"
                className='resume-header-logo'
              />
              US Citizen, No Visa Required
            </div>
          </div>
        </div>
        <div className='resume-body'>
          <div className='resume-body-left'>
            <h5 className='resume-body-header'>Education</h5>
            <p className='resume-text'>
              <strong>Santa Clara University</strong>
              <div>Computer Science, B.S.</div>
              <div>Mathematics, Minor</div>
              <div>Completed July 2020</div>
            </p>
            <h5 className='resume-body-header'>Technical Skills</h5>
            <h6><strong>Languages</strong></h6>
            <ul className='resume-text'>
              <li>JavaScript</li>
              <ul className='resume-text'>
                <li>Node.js</li>
                <li>TypeScript</li>
              </ul>
              <li>Python</li>
              <li>Go</li>
              <li>Bash</li>
            </ul>
            <h6><strong>Full Web Stack</strong></h6>
            <ul className='resume-text'>
              <li>Web Frontend</li>
              <ul className='resume-text'>
                <li>React</li>
                <li>Angular</li>
              </ul>
              <li>Web Backend</li>
              <ul className='resume-text'>
                <li>Express</li>
                <li>Flask</li>
              </ul>
              <li>API Protocols</li>
              <ul className='resume-text'>
                <li>REST</li>
                <li>GraphQL</li>
              </ul>
            </ul>
            <h6><strong>Databases</strong></h6>
            <ul className='resume-text'>
              <li>SQL</li>
              <ul className='resume-text'>
                <li>MySQL</li>
                <li>SQL Server</li>
                <li>PostgreSQL</li>
              </ul>
              <li>NoSQL</li>
              <ul className='resume-text'>
                <li>MongoDB</li>
                <li>DynamoDB</li>
              </ul>
            </ul>
            <h6><strong>DevOps</strong></h6>
            <ul className='resume-text'>
              <li>Cloud Services</li>
              <ul className='resume-text'>
                <li>AWS</li>
              </ul>
              <li>Test Automation</li>
              <ul className='resume-text'>
                <li>Jenkins</li>
                <li>Jasmine / Jest</li>
                <li>Protractor</li>
              </ul>
              <li>Git</li>
            </ul>
          </div>
          <div className='resume-body-right'>
            <h5 className='resume-body-header'>Professional Experience</h5>
            <h6>
              <strong>Full Stack Software Engineer</strong>, HCL BigFix
              <span className='resume-date-range'>5/20 - Now</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Software Engineer</i> for the web platform of a large <a href='https://www.hcltechsw.com/products/bigfix' target='_blank' rel='noopener noreferrer'>endpoint manager</a>.</li>
              <li><strong>Languages</strong>: Implemented with <strong>Node.js</strong>, <strong>JavaScript</strong>, and <strong>TypeScript</strong>.</li>
              <li><strong>Web</strong>: Launched several <strong>Angular</strong> web user interfaces and internal <strong>Express</strong> REST APIs.</li>
              <li><strong>Databases</strong>: Integrated and developed several <strong>SQL Server</strong> and <strong>IBM Db2</strong> queries.</li>
              <li><strong>Automation</strong>: Created end-to-end and unit test cases with <strong>Jasmine</strong> and <strong>Protractor</strong>.</li>
              <li><strong>Development</strong>: Monitored builds on <strong>Jenkins</strong> and delivered release items to the customer.</li>
            </ul>
            <h6>
              <strong>Full Stack Software Engineer</strong>, Infinite Options
              <span className='resume-date-range'>9/19 - 5/20</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Software Team Lead</i> for a Web-based, customer-facing e-commerce <a href='https://preptoyourdoor.netlify.app/' target='_blank' rel='noopener noreferrer'>platform</a>.</li>
              <li><strong>Languages</strong>: Largely written in <strong>Python</strong> and <strong>JavaScript.</strong></li>
              <li><strong>Web</strong>: Launched a <strong>React</strong> user interface and <strong>Flask</strong> REST APIs to facilitate data flow between the browser and the database.</li>
              <li><strong>Databases</strong>: Designed and developed <strong>MySQL</strong> and <strong>DynamoDB</strong> databases.</li>
              <li><strong>Automation</strong>: Created <strong>Python</strong> and <strong>Bash</strong> scripts to automate user subscription renewal and deployed it to run on a <strong>Linux</strong> virtual machine on <strong>AWS EC2</strong>.</li>
              <li><strong>Cloud</strong>: Launched the platform through <strong>AWS Lambda</strong>, <strong>RDS</strong>, and <strong>S3</strong>.</li>
              <li><strong>Development</strong>: Performed code reviews to ensure high quality code across a cross-functional team of 10+ engineers.</li>
            </ul>
            <h6>
              <strong>Software Team Lead</strong>, Grad Planner
              <span className='resume-date-range'>9/19 - 4/20</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Creator</i> of a web <a href='http://gradplanner.us/' target='_blank' rel='noopener noreferrer'>resource</a> that helps university students graduate on time.</li>
              <li><strong>Languages</strong>: Largely written in <strong>Python.</strong></li>
              <li><strong>Web</strong>: Created a <strong>Flask</strong> user interface and <strong>Python</strong> scheduling algorithm outputting optimized undergraduate plans in four or fewer years.</li>
              <li><strong>Databases</strong>: Developed and populated a <strong>MySQL</strong> database with class and degree data.</li>
              <li><strong>Cloud</strong>: Launched the platform through <strong>AWS EC2</strong> and <strong>RDS</strong>.</li>
            </ul>
            <h6>
              <strong>IT Technician</strong>, Kett Engineering
              <span className='resume-date-range'>7/18 - 3/19</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Software Tester</i> and <i>Technician</i> for an important, confidential project.</li>
              <li><strong>Automation</strong>: Developed unique <strong>Python</strong> and <strong>Bash</strong> scripts to assist other technicians with performing software utility checks.</li>
            </ul>
            <h5 className='resume-body-header'>Personal Projects</h5>
            <h6>
              <strong>Web Applications</strong>
            </h6>
            <ul className='resume-text'>
              <li><strong>Where To</strong>: A Chrome <a href='https://chrome.google.com/webstore/detail/where-to/kdhcodpjaffhbbphkahnkbllddjihima?hl=en&authuser=0' target='_blank' rel='noopener noreferrer'>extension</a> that introduces a customizable New Tab interface.</li>
              <ul className='resume-text'>
                <li>Written with <strong>React</strong> and <strong>TypeScript</strong>.</li>
              </ul>
              <li><strong>CovidSweeper</strong>: A fun <a href='https://park-junha.github.io/CovidSweeper/' target='_blank' rel='noopener noreferrer'> Minesweeper variant</a> built with <strong>Angular</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.</li>
              <li><strong>Personal Website</strong>: Developed with <strong>Angular</strong>, <strong>GraphQL</strong>, <strong>TypeScript</strong> and <strong>Go</strong>.</li>
            </ul>
            <h6>
              <strong>Automation Tools</strong>
            </h6>
            <ul className='resume-text'>
              <li><strong>Spekkio</strong>: A set of tools and services that automate CI/CD on GitHub. Written with <strong>Go</strong>.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
}

export default Resume;
