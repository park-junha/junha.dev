//  GraphQL query
export interface GQLRequest {
  query: string;
}

//  API interfaces
export interface ProjectsApi {
  projects: ProjectData;
  status: number;
}

export interface ApiData {
  Projects: ProjectsApi;
}

//  Projects
export interface Project {
  title: string;
  languages: Tools;
  tools: Tools;
  description: string;
  about: string | null;
  url: string | null;
  source_code_url: string | null;
}

export interface ProjectData extends Array<Project>{};

//  Language IDs
export interface Tool {
  name: string;
  color: string;
}

export interface Tools extends Array<Tool>{};

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

