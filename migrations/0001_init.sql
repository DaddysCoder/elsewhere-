CREATE TABLE IF NOT EXISTS subscribers (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  github_id TEXT UNIQUE,
  display_name TEXT NOT NULL,
  initials TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS threads (
  id TEXT PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_initials TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS replies (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_initials TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (thread_id) REFERENCES threads(id)
);

INSERT OR IGNORE INTO threads (id, author_name, author_initials, title, body, created_at) VALUES
(
  'thread-ontology',
  'r.nakamura',
  'rn',
  'If objects are just useful patterns, is "useful" doing all the work?',
  'Re: essay 01 — feels like the definition just relocates the hard question rather than answering it. If a chair is a chair only when treating it as one is useful, who is the usefulness for, and what happens when two models disagree?',
  '2026-09-05T09:12:00.000Z'
),
(
  'thread-routing',
  'k.tran',
  'kt',
  'Looking for the paper on shortest-path routing under drift',
  'Someone mentioned it in a call, can''t find it on the publications page. Is the routing write-up public yet, or still circulating as a note?',
  '2026-09-03T16:40:00.000Z'
),
(
  'thread-zero',
  'a.ezra',
  'ae',
  'A half-finished thought about zero and unresolved state',
  'Not sure this goes anywhere but writing it down before I lose it. Zero as a named absence still feels like a claim about the map, not the territory — and I keep wanting a third option between "nothing" and "a zero".',
  '2026-08-31T11:05:00.000Z'
);

INSERT OR IGNORE INTO replies (id, thread_id, author_name, author_initials, body, created_at) VALUES
('r1', 'thread-ontology', 'elsewhere', 'ew', 'Usefulness is indexed to a purpose. Two people can both be right about different compressions of the same mess. The interesting fight is which purpose is in play, not which object is "real".', '2026-09-05T12:04:00.000Z'),
('r2', 'thread-ontology', 'k.tran', 'kt', 'That helps, but then "object" is just "model that paid rent." I wanted a sharper stop than that.', '2026-09-05T18:22:00.000Z'),
('r3', 'thread-ontology', 'r.nakamura', 'rn', 'Maybe the sharper stop is empirical: when switching units starts losing predictions you actually cared about.', '2026-09-06T08:15:00.000Z'),
('r4', 'thread-routing', 'elsewhere', 'ew', 'It''s up now under Research — Shortest-Path Routing Under Structural Drift. The public version is the working paper, not a PDF dump.', '2026-09-03T19:10:00.000Z'),
('r5', 'thread-routing', 'k.tran', 'kt', 'Found it. The confidence-tracking bit is what I was remembering from the call.', '2026-09-04T09:33:00.000Z'),
('r6', 'thread-zero', 'r.nakamura', 'rn', 'Unresolved feels closer than zero. Zero is a value. Unresolved is a refusal to pick one.', '2026-09-01T14:48:00.000Z'),
('r7', 'thread-zero', 'elsewhere', 'ew', 'Essay 10 is circling this. Zero is interesting because it is still a mark on the page.', '2026-09-02T10:02:00.000Z'),
('r8', 'thread-zero', 'a.ezra', 'ae', 'Yes — that''s the bit I didn''t want to lose. Leaving it here.', '2026-09-02T21:17:00.000Z');
