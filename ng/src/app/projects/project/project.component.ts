import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Project) { }

  languagesExist(project: Project): boolean {
    return project.languages?.length > 0;
  }

  otherToolsExist(project: Project): boolean {
    return project.tools?.length > 0;
  }

}
