CREATE TABLE duration (
    id serial PRIMARY KEY,
    value integer UNIQUE
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(45) UNIQUE,
    password text
);

CREATE TABLE region (
    id serial PRIMARY KEY,
    name varchar(45) UNIQUE
);

CREATE TABLE capitals (
    id serial PRIMARY KEY,
    country varchar(45) UNIQUE,
    capital varchar(45),
    region_id integer REFERENCES region(id) ON DELETE SET NULL
);

CREATE TABLE game (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    score integer CHECK (score >= 0),
    duration_id integer REFERENCES duration(id) ON DELETE CASCADE,
    region_id integer REFERENCES region(id) ON DELETE CASCADE,
    date_played date CHECK (date_played <= current_date)
);

CREATE TABLE feedback (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    comment text,
    date_created date
);

CREATE TABLE achievements (
    id serial PRIMARY KEY,
    achievement_name varchar(45) UNIQUE,
    achievement_description text
);

CREATE TABLE achievements_acquired (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    achievement_id integer REFERENCES achievements(id) ON DELETE CASCADE,
    game_id integer REFERENCES game(id) ON DELETE SET NULL
);
