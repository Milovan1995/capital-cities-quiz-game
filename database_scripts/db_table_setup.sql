-- Create the 'duration' table
CREATE TABLE duration (
    id serial PRIMARY KEY,
    value INT
);

-- Create the 'users' table
CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

-- Create the 'region' table
CREATE TABLE region (
    id serial PRIMARY KEY,
    name VARCHAR(255)
);
-- Create the 'capitals' table
CREATE TABLE capitals (
    id serial PRIMARY KEY,
    country VARCHAR(255),
    capital VARCHAR(255),
    region_id INT REFERENCES region(id)
);

-- Create the 'game' table
CREATE TABLE game (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),
    score INT,
    duration_id INT REFERENCES duration(id),
    region_id INT REFERENCES region(id),
    date_played DATE
);

-- Create the 'highscores' table
CREATE TABLE highscores (
    id serial PRIMARY KEY,
    duration_id INT REFERENCES duration(id),
    game_id INT REFERENCES game(id),
    user_id INT REFERENCES users(id),
    UNIQUE (game_id)
);

-- Create the 'feedback' table
CREATE TABLE feedback (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),
    comment TEXT,
    date_created DATE
);

-- Create the 'achievements' table
CREATE TABLE achievements (
    id serial PRIMARY KEY,
    user_id INT REFERENCES users(id),
    achievement_name VARCHAR(255),
    achievement_description TEXT,
    game_id INT REFERENCES game(id)
);
