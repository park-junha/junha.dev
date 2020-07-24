SELECT
  tech_id
  , name
  , color
FROM
  technologies
WHERE
  tech_id LIKE $1
ORDER BY
  tech_id
ASC;
