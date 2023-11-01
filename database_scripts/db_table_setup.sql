CREATE TABLE duration (
    id serial PRIMARY KEY,
    value integer
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(45),
    password text
);

CREATE TABLE region (
    id serial PRIMARY KEY,
    name varchar(45)
);

CREATE TABLE capitals (
    id serial PRIMARY KEY,
    country VARCHAR(45),
    capital VARCHAR(45),
    region_id INT REFERENCES region(id) ON DELETE SET NULL
);

CREATE TABLE game (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    score integer,
    duration_id integer REFERENCES duration(id) ON DELETE CASCADE,
    region_id integer REFERENCES region(id) ON DELETE CASCADE,
    date_played date
);

CREATE TABLE scores (
    id serial PRIMARY KEY,
    duration_id INT REFERENCES duration(id) ON DELETE CASCADE,
    game_id INT REFERENCES game(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (game_id);
);

CREATE TABLE feedback (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT,
    date_created DATE
);

CREATE TABLE achievements (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    achievement_name VARCHAR(45),
    achievement_description TEXT,
    game_id INT REFERENCES game(id) ON DELETE SET NULL
);
