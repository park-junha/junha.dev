//  API interfaces

export interface Api {
  Versions: VersionData;
  TechnicalSkills: Skillsets;
  Projects: ProjectData;
  ProfessionalExperience: ExperienceData;
}

//  Versions
export interface Version {
  version: string;
  notes: VersionNotes
}

export interface VersionNote {
  label: string;
  desc: string;
}

export interface VersionData extends Array<Version>{};
export interface VersionNotes extends Array<VersionNote>{};

//  Projects
export interface Project {
  name: string;
  employer: string;
  codebases: string[];
  databases: string[];
  frameworks: string[];
}

export interface ProjectData extends Array<Project>{};

//  Experience
export interface ExperienceData {
  defaultKey: string;
  experience: Experiences;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  body: string;
}

export interface Experiences extends Array<Experience>{};

//  Skillsets
export interface Skillset {
  skillset: string;
  skills: Skills;
}

export interface Skill {
  name: string;
  level: number;
  desc: string;
}

export interface Skillsets extends Array<Skillset>{};
export interface Skills extends Array<Skill>{};
