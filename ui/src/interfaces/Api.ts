//  GraphQL query
export interface GQLRequest {
  query: string;
}

//  API interfaces
export interface ProjectsApi {
  projects: ProjectData;
}

export interface LanguageIdsApi {
  languages: LanguageIds;
}

export interface ToolIdsApi {
  tools: LanguageIds;
}

export interface ApiData {
  Projects: ProjectData;
  language_ids: LanguageIds;
  tool_ids: LanguageIds;  //  Use same interface as language IDs
}

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
export interface LanguageId {
  uid: string;
  name: string;
  color: string;
}

export interface LanguageIds extends Array<LanguageId>{};
