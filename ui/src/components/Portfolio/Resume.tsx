//  Uncomment contents of componentDidMount() when PDF export is fixed

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  IoLogoLinkedin
, IoLogoGithub
, IoIosGlobe
, IoIosMail
} from 'react-icons/io';
import {
  MdPhone
, MdWork
} from 'react-icons/md';
import canvg, { Parser } from 'canvg';

interface Props {
  id: string;
}

interface Resume {
  iconsToConvert: ResumeIcons;
  canvLoaded: boolean;
}

interface ResumeIcons extends Array<ResumeIcon>{};
interface ResumeIcon {
  icon: JSX.Element;
  alt: string;
  newIconURL?: string;
}

class Resume extends Component<Props> {
  constructor(props: Props) {
    super(props);

    //  This property is needed for converting SVG icons to images
    //  Currently, kendo-react-pdf cannot render SVG icons
    //  WORKAROUND: Convert them to PNG images
    this.iconsToConvert = [
      {
        icon: <IoLogoLinkedin
                className='resume-header-logo'
              />
      , alt: 'LI'
      }
    , {
        icon: <IoLogoGithub
                className='resume-header-logo'
              />
      , alt: 'GH'
      }
    , {
        icon: <IoIosGlobe
                className='resume-header-logo'
              />
      , alt: 'IG'
      }
    , {
        icon: <IoIosMail
                className='resume-header-logo'
              />
      , alt: 'IM'
      }
    , {
        icon: <MdPhone
                className='resume-header-logo'
              />
      , alt: 'MP'
      }
    , {
        icon: <MdWork
                className='resume-header-logo'
              />
      , alt: 'MW'
      }
    ];
    this.canvLoaded = false;
  }

  componentDidMount() {
//  this.convertSvgToImg();
  }

  convertSvgToImg() {
    let canv: any = this.refs.invisibleCanvas;  //  not sure if best way...
    if (!this.canvLoaded) {
      this.canvLoaded = true;
      canv.getContext('2d');
      //  Parser object
      const parser = new Parser();

      this.iconsToConvert.forEach((d, i) => {
        //  Convert icons to SVG in string format
        let htmlString = ReactDOMServer.renderToString(d.icon);
        //  Then parse the string into a Document type
        let svgDoc = parser.parseFromString(htmlString);
        //  Put the SVG into invisible canvas
        new canvg(canv, svgDoc);  //  Passing a string on 2nd parameter throws error
        //  Retrieve the base64 image object
        d.newIconURL = canv.toDataURL('image/png');
      });
      console.log(this.iconsToConvert);
      console.log("Finished attempting to convert SVG icons to base64 images!");
    }
  }

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
              {!this.iconsToConvert[0].newIconURL ?
                <IoLogoLinkedin
                  className='resume-header-logo'
                />
                :
                <img
                  src={this.iconsToConvert[0].newIconURL}
                  key={this.iconsToConvert[0].alt}
                  alt={this.iconsToConvert[0].alt}
                  className='resume-header-logo'
                  style={{
                    height: 15
                  , width: 15
                  }}
                />
              }
              <a
                href='https://www.linkedin.com/in/park-junha/'
                target='_blank'
                rel='noopener noreferrer'
              >
                linkedin.com/in/park-junha
              </a>
              <br />
              {!this.iconsToConvert[1].newIconURL ?
                <IoLogoGithub
                  className='resume-header-logo'
                />
                :
                <img
                  src={this.iconsToConvert[1].newIconURL}
                  key={this.iconsToConvert[1].alt}
                  alt={this.iconsToConvert[1].alt}
                  className='resume-header-logo'
                  style={{
                    height: 15
                  , width: 15
                  }}
                />
              }
              <a
                href='https://github.com/park-junha'
                target='_blank'
                rel='noopener noreferrer'
              >
                github.com/park-junha
              </a>
              <br />
              {!this.iconsToConvert[2].newIconURL ?
                <IoIosGlobe
                  className='resume-header-logo'
                />
                :
                <img
                  src={this.iconsToConvert[2].newIconURL}
                  key={this.iconsToConvert[2].alt}
                  alt={this.iconsToConvert[2].alt}
                  className='resume-header-logo'
                  style={{
                    height: 15
                  , width: 15
                  }}
                />
              }
              <a
                href='https://junha.netlify.app/'
                target='_blank'
                rel='noopener noreferrer'
              >
                junha.netlify.app
              </a>
            </div>
            <div className='resume-header-right-right'>
              {!this.iconsToConvert[3].newIconURL ?
                <IoIosMail
                  className='resume-header-logo'
                />
                :
                <img
                  src={this.iconsToConvert[3].newIconURL}
                  key={this.iconsToConvert[3].alt}
                  alt={this.iconsToConvert[3].alt}
                  className='resume-header-logo'
                  style={{
                    height: 15
                  , width: 15
                  }}
                />
              }
              jpark3@scu.edu
              <br />
              {!this.iconsToConvert[4].newIconURL ?
                <MdPhone
                  className='resume-header-logo'
                />
                :
                <img
                  src={this.iconsToConvert[4].newIconURL}
                  key={this.iconsToConvert[4].alt}
                  alt={this.iconsToConvert[4].alt}
                  className='resume-header-logo'
                  style={{
                    height: 15
                  , width: 15
                  }}
                />
              }
              (971) 230-8858
              <br />
              {!this.iconsToConvert[5].newIconURL ?
                <MdWork
                  className='resume-header-logo'
                />
                :
                <img
                  src={this.iconsToConvert[5].newIconURL}
                  key={this.iconsToConvert[5].alt}
                  alt={this.iconsToConvert[5].alt}
                  className='resume-header-logo'
                  style={{
                    height: 15
                  , width: 15
                  }}
                />
              }
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
              <div>Attended 9/15 - 7/20</div>
            </p>
            <h5 className='resume-body-header'>Technical Skills</h5>
            <h6><strong>Codebases</strong></h6>
            <ul className='resume-text'>
              <li>Python</li>
              <li>JavaScript</li>
              <ul className='resume-text'>
                <li>Node.js</li>
                <li>TypeScript</li>
              </ul>
              <li>Bash / Shell</li>
              <li>Go</li>
            </ul>
            <h6><strong>Full Web Stack</strong></h6>
            <ul className='resume-text'>
              <li>Web Frontend</li>
              <ul className='resume-text'>
                <li>React</li>
                <li>HTML / CSS</li>
                <li>Bootstrap</li>
              </ul>
              <li>Web Backend</li>
              <ul className='resume-text'>
                <li>Flask</li>
                <li>Express</li>
              </ul>
              <li>Web Protocols</li>
              <ul className='resume-text'>
                <li>REST</li>
                <li>HTTP</li>
                <li>JSON</li>
              </ul>
            </ul>
            <h6><strong>Databases</strong></h6>
            <ul className='resume-text'>
              <li>MySQL</li>
              <li>SQL Server</li>
              <li>MongoDB</li>
            </ul>
            <h6><strong>Cloud Services</strong></h6>
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
              <li>Linux</li>
              <li>Git</li>
            </ul>
          </div>
          <div className='resume-body-right'>
            <h5 className='resume-body-header'>Professional Experience</h5>
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
              <li><strong>Web</strong>: Launched a <strong>React</strong> user interface and <strong>Flask</strong> REST APIs to facilitate data flow between the browser and the database.</li>
              <li><strong>Database</strong>: Designed and developed a <strong>MySQL</strong> database.</li>
              <li><strong>Automation</strong>: Created <strong>Python</strong> and <strong>Shell</strong> scripts to automate user subscription renewal and deployed it to run on a <strong>Linux</strong> virtual machine on <strong>AWS EC2</strong>.</li>
              <li><strong>Cloud</strong>: Launched the platform through <strong>AWS Lambda</strong>, <strong>RDS</strong>, and <strong>S3</strong>.</li>
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
              <li><strong>Mobile</strong>: Maintained a cross-platform <strong>Xamarin</strong> mobile user interface and delivered it to the <a href='https://apps.apple.com/us/app/serving-now/id1467700794' target='_blank' rel='noopener noreferrer'>Apple</a> and <a href='https://play.google.com/store/apps/details?id=com.infiniteoptions.tiffen.InfiniteMeals&hl=en_US' target='_blank' rel='noopener noreferrer'>Play</a> Stores.</li>
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
              <strong>Grad Planner</strong>, Python
              <span className='resume-date-range'>9/19 - Now</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Creator</i> of a web <a href='http://gradplanner.us/' target='_blank' rel='noopener noreferrer'>resource</a> that helps university students stay on track for graduation.</li>
            </ul>
            <h6>
              <strong>Personal Website</strong>, TypeScript
              <span className='resume-date-range'>4/20 - Now</span>
            </h6>
            <ul className='resume-text'>
              <li>Developed with <strong>React</strong> and connected to a <strong>MongoDB</strong> backend through <strong>Flask</strong> APIs.</li>
            </ul>
            <h6>
              <strong>Chrome V8</strong>, C++
              <span className='resume-date-range'>4/20 - Now</span>
            </h6>
            <ul className='resume-text'>
              <li><i>Open Source Contributor</i> for the JavaScript engine powering Google Chrome and Node.js.</li>
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
        {/* Insivible canvas for converting SVGs to PNGs */}
        {!this.canvLoaded &&
          <canvas
            ref='invisibleCanvas'
            style={{ display: 'none' }}
          >
          </canvas>
        }
      </div>
    );
  };
}

export default Resume;
