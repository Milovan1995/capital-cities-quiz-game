CREATE TABLE duration (
    id SERIAL PRIMARY KEY,
    value INTEGER UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(45) UNIQUE,
    password TEXT,
    privilege INTEGER
);

CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) UNIQUE
);

CREATE TABLE capitals (
    id SERIAL PRIMARY KEY,
    country VARCHAR(45) UNIQUE,
    capital VARCHAR(45),
    region_id INTEGER REFERENCES region(id) ON DELETE SET NULL
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER CHECK (score >= 0),
    duration_id INTEGER REFERENCES duration(id) ON DELETE CASCADE,
    region_id INTEGER REFERENCES region(id) ON DELETE CASCADE,
    date_played DATE CHECK (date_played <= current_date)
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT,
    date_created DATE
);

CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    achievement_name VARCHAR(45) UNIQUE,
    achievement_description TEXT
);

CREATE TABLE achievements_acquired (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES game(id) ON DELETE SET NULL
);
