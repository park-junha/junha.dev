import React, { Component } from 'react';
import {
  IoLogoGithub
, IoLogoLinkedin
, IoIosMail
, IoIosGlobe
} from 'react-icons/io';
import {
  MdWork
, MdPhone
} from 'react-icons/md';

export default class Resume extends Component {
  render (): JSX.Element {
    return (
      <div className='resume'>
        <div className='resume-header'>
          <div className='resume-header-left'>
            <h2>Junha Park</h2>
            <h6>Full Stack Software Engineer</h6>
          </div>
          <div className='resume-header-right'>
            <div className='resume-header-right-left'>
              <IoLogoLinkedin
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
              <IoLogoGithub
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
              <IoIosGlobe
                className='resume-header-logo'
              />
              <a
                href='https://junha.netlify.app/'
                target='_blank'
                rel='noopener noreferrer'
              >
                junha.netlify.app
              </a>
            </div>
            <div className='resume-header-right-right'>
              <IoIosMail
                className='resume-header-logo'
              />
              jpark3@scu.edu
              <br />
              <MdPhone
                className='resume-header-logo'
              />
              (971) 230-8858
              <br />
              <MdWork
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
              <div>Mathematics Minor</div>
            </p>
            <h5 className='resume-body-header'>Technical Skills</h5>
            <h6><strong>Codebases</strong></h6>
            <ul className='resume-text'>
              <li>Python</li>
              <li>JavaScript</li>
              <li>Bash / Shell</li>
              <li>C / C++</li>
            </ul>
            <h6><strong>Full Web Stack</strong></h6>
            <ul className='resume-text'>
              <li>Web UI</li>
              <ul className='resume-text'>
                <li>React</li>
                <li>HTML / CSS</li>
              </ul>
              <li>Web API</li>
              <ul className='resume-text'>
                <li>Flask</li>
                <li>REST / HTTP</li>
                <li>JSON / XML</li>
              </ul>
              <li>Web Server</li>
              <ul className='resume-text'>
                <li>Node.js</li>
                <li>Apache</li>
              </ul>
            </ul>
            <h6><strong>Databases</strong></h6>
            <ul className='resume-text'>
              <li>SQL</li>
              <ul className='resume-text'>
                <li>MySQL</li>
                <li>PostgreSQL</li>
              </ul>
              <li>NoSQL</li>
              <ul className='resume-text'>
                <li>MongoDB</li>
                <li>DynamoDB</li>
              </ul>
            </ul>
            <h6><strong>Cloud Computing</strong></h6>
            <ul className='resume-text'>
              <li>AWS</li>
              <ul className='resume-text'>
                <li>EC2</li>
                <li>RDS</li>
                <li>Lambda</li>
                <li>S3</li>
              </ul>
            </ul>
            <h6><strong>Other</strong></h6>
            <ul className='resume-text'>
              <li>Linux / POSIX</li>
              <li>Git</li>
            </ul>
          </div>
          <div className='resume-body-right'>
            <h5 className='resume-body-header'>Professional Experience</h5>
            {/*
            <h6>
              <strong>Full Stack Software Engineer</strong>, HCL Technologies
              <span className='resume-date-range'>5/20 - Now</span>
            </h6>
            <strong className='resume-text'>
              BigFix
            </strong>
            <ul className='resume-text'>
              <li><i>Full Stack Software Engineer</i> for a B2B software product facilitating administrators to maintain hundreds of thousands of computers.</li>
            </ul>
            */}
            <h6>
              <strong>Full Stack Software Engineer</strong>, Infinite Options
              <span className='resume-date-range'>9/19 - Now</span>
            </h6>
            <strong className='resume-text'>
              Prep To Your Door
            </strong>
            <ul className='resume-text'>
              <li><i>Software Team Lead</i> for a Web-based, customer-facing e-commerce <a href='https://preptoyourdoor.netlify.app/' target='_blank' rel='noopener noreferrer'>platform</a>.</li>
              <li><strong>Codebase</strong>: Largely written in <strong>Python</strong> and <strong>JavaScript.</strong></li>
              <li><strong>Web</strong>: Developed a <strong>React</strong> user interface and <strong>Flask</strong> REST APIs to facilitate data flow between the browser and the database.</li>
              <li><strong>Database</strong>: Designed schema and developed a <strong>MySQL</strong> database.</li>
              <li><strong>Automation</strong>: Created a <strong>Python</strong> script to automate user subscription renewal and deployed it to run in the background of a <strong>Linux</strong> virtual machine on <strong>AWS EC2</strong>.</li>
              <li><strong>Cloud</strong>: Delivered the platform through <strong>AWS Lambda</strong>, <strong>RDS</strong>, and <strong>S3</strong>.</li>
              <li><strong>Other</strong>: Performed 100+ code reviews, merges, and interactive rebases with <strong>Git</strong> to ensure high quality code across a cross-functional team of 10+ engineers.</li>
            </ul>
            <strong className='resume-text'>
              Serving Now
            </strong>
            <ul className='resume-text'>
              <li><i>Software Engineer</i> for a Web and Mobile <a href='https://servingnow.me/home' target='_blank' rel='noopener noreferrer'>platform</a> connecting farmers directly to the end consumer.</li>
              <li><strong>Codebase</strong>: Largely written in <strong>Python</strong> (web), <strong>HTML</strong> (web), and <strong>C#</strong> (mobile).</li>
              <li><strong>Web</strong>: Developed <strong>Flask</strong> REST APIs to facilitate data flow between the database, web, and mobile interfaces.</li>
              <li><strong>Database</strong>: Scaled and manipulated a <strong>DynamoDB</strong> database.</li>
              <li><strong>Mobile</strong>: Developed a cross-platform <strong>Xamarin</strong> mobile user interface and delivered it to the <a href='https://apps.apple.com/us/app/serving-now/id1467700794' target='_blank' rel='noopener noreferrer'>Apple</a> and <a href='https://play.google.com/store/apps/details?id=com.infiniteoptions.tiffen.InfiniteMeals&hl=en_US' target='_blank' rel='noopener noreferrer'>Play</a> Stores.</li>
              <li><strong>Other</strong>: Resolved merge conflicts on <strong>Git</strong> as necessary.</li>
            </ul>
            <h6>
              <strong>IT Technician</strong>, Kett Engineering
              <span className='resume-date-range'>7/18 - 3/19</span>
            </h6>
            <strong className='resume-text'>
              Confidential Project
            </strong>
            <ul className='resume-text'>
              <li><i>Software Tester</i> and <i>Technician</i> for an important, confidential project.</li>
              <li><strong>Automation</strong>: Developed unique <strong>Python</strong> and <strong>Shell</strong> scripts to assist other technicians with performing software utility checks.</li>
            </ul>
            <h5 className='resume-body-header'>Projects</h5>
            <h6>
              <strong>Google Chrome V8 Engine</strong>, C++
              <span className='resume-date-range'>4/20 - Now</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Open Source Contributor</i> for Google Chrome&#39;s JavaScript engine.</li>
            </ul>
            <h6>
              <strong>Grad Planner</strong>, Python
              <span className='resume-date-range'>9/19 - Now</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Creator</i> and <i>Full Stack Developer</i> of a web <a href='http://gradplanner.us/' target='_blank' rel='noopener noreferrer'>resource</a> that helps university students stay on track for graduation.</li>
              <li>Developed with <strong>Flask</strong> and delivered to the web with <strong>Linux</strong> and <strong>Apache</strong> via <strong>AWS</strong>.</li>
            </ul>
            <h6>
              <strong>CovidSweeper</strong>, JavaScript
              <span className='resume-date-range'>3/20</span>
            </h6>
            <ul className='resume-text'>
              <li>A more challenging <a href='https://park-junha.github.io/CovidSweeper/' target='_blank' rel='noopener noreferrer'>variation</a> of Minesweeper.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
}
