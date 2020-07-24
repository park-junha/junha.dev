SELECT
  experience_id
  , label
  , company
  , title
  , start_date
  , COALESCE(end_date::TEXT, 'Current')
  , description
FROM
  Experience
WHERE
  experience_id = $1
ORDER BY
  experience_id
DESC;
