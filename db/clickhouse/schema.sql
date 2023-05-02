CREATE TABLE sessions (
  website_id String,
  session_id FixedString(64),
  event_id FixedString(64),
  --session
  hostname LowCardinality(String),
  browser LowCardinality(String),
  os LowCardinality(String),
  device LowCardinality(String),
  screen LowCardinality(String),
  language LowCardinality(String),
  country LowCardinality(String),
  city String,
  --pageview
  url_path String,
  url_query String,
  referrer_path String,
  referrer_query String,
  referrer_domain String,
  page_title String,
  --event
  event_name String,
  created_at DateTime('UTC')
) engine = MergeTree
ORDER BY
  (website_id, session_id, created_at) SETTINGS index_granularity = 8192;

CREATE TABLE events (
  website_id String,
  session_id FixedString(64),
  event_id FixedString(64),
  url_path String,
  event_name String,
  event_key String,
  event_value Nullable(String),
  created_at DateTime('UTC')
) engine = MergeTree
ORDER BY
  (website_id, event_id, event_key, created_at) SETTINGS index_granularity = 8192;