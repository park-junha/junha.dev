import { Component } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

import { VERSION } from '../../environments/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public version: string = VERSION;

  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faFilePdf = faFilePdf;
}
