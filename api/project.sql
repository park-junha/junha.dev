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
        UNNEST(p.languages) WITH ORDINALITY pl(items, nr)
      LEFT JOIN
        tools l
      ON
        l.tool_id = pl.items
      ORDER BY pl.nr
    ) ls
  )
  , ARRAY(
    SELECT
      ROW_TO_JSON(ots)
    FROM (
      SELECT
        ot.*
      FROM
        UNNEST(p.other_tools) WITH ORDINALITY pt(items, nr)
      LEFT JOIN
        tools ot
      ON
        ot.tool_id = pt.items
      ORDER BY pt.nr
    ) ots
  )
FROM
  projects p
WHERE
  project_id = $1;
