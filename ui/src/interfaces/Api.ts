//  API interfaces

export interface Api {
  message: string;
  result: ApiResults;
}

export interface ApiData {
  Projects: ProjectData;
  language_ids: LanguageIds;
  tool_ids: LanguageIds;  //  Use same interface as language IDs
}

export interface ApiResults extends Array<ApiData>{};

//  Versions
export interface Version {
  version: string;
  notes: VersionNotes;
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
  languages: string[];
  tools: string[];
  desc: string;
  about: string | null;
  app: string | null;
  src: string | null;
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
