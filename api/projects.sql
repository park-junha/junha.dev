SELECT
  project_id
  , title
  , description
  , about
  , url
  , source_code_url
  , ARRAY(
  SELECT
    ROW_TO_JSON(ls)
  FROM (
    SELECT
      l.*
    FROM
      UNNEST(p.languages) project_langs
    LEFT JOIN
      tools l
    ON
      l.tool_id = project_langs
  ) ls)
  , ARRAY(
  SELECT
    ROW_TO_JSON(ots)
    FROM (
      SELECT
        ot.*
      FROM
        UNNEST(p.other_tools) project_tools
      LEFT JOIN
        tools ot
      ON
        ot.tool_id = project_tools
    ) ots)
FROM
  projects p;
