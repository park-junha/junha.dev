//  API interfaces

export interface Api {
  TechnicalSkills: Skillsets;
  ProfessionalExperience: ExperienceData;
}

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
export interface Experiences extends Array<Experience>{};
