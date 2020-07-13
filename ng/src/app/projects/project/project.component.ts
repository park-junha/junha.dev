import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  public aboutLabel: string = 'Overview';
  public sourceUrlLabel: string = '(source code)';
  public languagesLabel: string = 'Languages';
  public otherToolsLabel: string = 'Other Technologies';
  public closeLabel: string = 'Close';

  public noAbout: string = 'No description available.';
  public noUrl: string = 'No demo available.';
  public noSourceUrl: string = '(source code unavailable)';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Project) { }

  languagesExist(): boolean {
    return this.data.languages?.length > 0;
  }

  otherToolsExist(): boolean {
    return this.data.tools?.length > 0;
  }

}
