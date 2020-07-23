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
ORDER BY
  experience_id
DESC;
