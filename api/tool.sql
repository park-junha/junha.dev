SELECT
  tool_id
  , name
  , color
FROM
  Tools
WHERE
  tool_id = $1;
