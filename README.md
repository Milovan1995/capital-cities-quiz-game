# Capital Cities Quiz Game

A web-based quiz game to test your knowledge of capital cities.

## Table of Contents

- [Capital Cities Quiz Game](#capital-cities-quiz-game)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Usage](#usage)
  - [Technologies used](#technologies-used)


## Overview

This project is a web-based quiz game that challenges users to test their knowledge of capital cities from around the world. Users can register, log in, and track their quiz history and high scores. The application is built using Angular for the front-end, Node.js for the back-end, and PostgreSQL for the database.

## Features

- User registration and login.
- Quiz game with random questions.
- Score tracking and leaderboard.
- User profile with quiz history.

 More details about features on FEATURES.md file.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- PostgreSQL installed and a database created for the application.

## Database Setup
To set up the database for this project, follow these steps:
   1. Create a new PostgreSQL database for this project using pgAdmin or the command line:
   
   - createdb capital_cities_quiz
   
   2. Open your PostgreSQL client and connect to the newly created database
   3. Run the SQL scripts in the 'database_scripts' directory to create the necessary tables and populate the initial data, or follow the commands from the sql file db_table_setup.sql to setup the initial tables if you would want to set them up manualy: 
   - psql -d capital_cities_quiz -a -f database_scripts/db_table_setup.sql
   
## Usage

- Register an account or log in to start playing the quiz game.
- Track your high scores and quiz history in your user profile.
- Compete with other users to reach the top of the leaderboard.

## Technologies used
- Angular
- Node
- PostgreSQL

