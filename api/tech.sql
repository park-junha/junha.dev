SELECT
  tool_id
  , name
  , color
FROM
  technologies
WHERE
  tech_id = $1;
