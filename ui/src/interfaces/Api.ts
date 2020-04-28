//  API interfaces

export interface Api {
  Versions: VersionData;
  TechnicalSkills: Skillsets;
  Projects: ProjectData;
  language_ids: LanguageIds;
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
  employer: string | null;
  languages: string[];
//desc: string;
}

export interface ProjectData extends Array<Project>{};

//  Language IDs
export interface LanguageIds {
  [key: string]: LanguageId;
}

export interface LanguageId {
  name: string;
  color: string;
}


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
