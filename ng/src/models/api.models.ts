export interface ApiResponse {
  data: {
    experiences?: Array<Experience>;
    experience?: Experience;
    projects?: Array<Project>;
    project?: Project;
  };
};

export interface Api {
  projects: Array<Project>;
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
