CREATE TABLE Experience (
  experience_id CHAR(4) PRIMARY KEY
  , label TEXT NOT NULL
  , company TEXT NOT NULL
  , title TEXT NOT NULL
  , start_date DATE NOT NULL
  , end_date DATE
  , description TEXT []
);

CREATE TABLE Tools (
  tool_id CHAR(4) PRIMARY KEY
  , name TEXT
  , color CHAR(7)
);

CREATE TABLE Projects (
  project_id CHAR(4) PRIMARY KEY
  , title TEXT
  , description TEXT
  , about TEXT
  , url TEXT
  , source_code_url TEXT
  , languages CHAR(4) []
  , other_tools CHAR(4) []
);
