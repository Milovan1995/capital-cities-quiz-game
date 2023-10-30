CREATE TABLE duration (
    id serial PRIMARY KEY,
    value INT
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(45),
    password TEXT
);

CREATE TABLE region (
    id serial PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE capitals (
    id serial PRIMARY KEY,
    country VARCHAR(45),
    capital VARCHAR(45),
    region_id INT REFERENCES region(id)
);

CREATE TABLE game (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),
    score INT,
    duration_id INT REFERENCES duration(id),
    region_id INT REFERENCES region(id),
    date_played DATE
);

CREATE TABLE scores (
    id serial PRIMARY KEY,
    duration_id INT REFERENCES duration(id),
    game_id INT REFERENCES game(id),
    user_id INT REFERENCES users(id),
    UNIQUE (game_id)
);

CREATE TABLE feedback (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),
    comment TEXT,
    date_created DATE
);

CREATE TABLE achievements (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),
    achievement_name VARCHAR(45),
    achievement_description TEXT,
    game_id INT REFERENCES game(id)
);
