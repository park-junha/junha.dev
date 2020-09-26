export interface ApiResponse {
  data: {
    experiences?: Array<Experience>;
    experience?: Experience;
    personal_projects?: Array<Project>;
    personal_project?: Project;
    professional_projects?: Array<Project>;
    professional_project?: Project;
    open_source_projects?: Array<Project>;
    open_source_project?: Project;

    projects?: Array<Project>;  //  LEGACY
    project?: Project;          //  LEGACY
  };
};

export interface Api {
  personal_projects: Array<Project>;
  professional_projects: Array<Project>;
  open_source_projects: Array<Project>;
  experiences: Array<Experience>;
};

export interface Experience {
  label: string;
  company: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string[];
};

export interface Project {
  title: string;
  languages: Array<Tool>;
  tools: Array<Tool>;
  description: string;
  about: string | null;
  url: string | null;
  source_code_url: string | null;
};

export interface Tool {
  name: string;
  color: string;
};
