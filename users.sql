CREATE DATABASE IF NOT EXISTS nagp_demo_db;

CREATE USER IF NOT EXISTS nagp_demo_user;
GRANT ALL PRIVILEGES ON nagp_demo_db.* TO nagp_demo_user;
FLUSH PRIVILEGES;

USE nagp_demo_db;

CREATE TABLE IF NOT EXISTS  users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );

INSERT INTO users (name,email) VALUES ('Alice','alice@gmail.com'), ('Bob','bob@gmail.com'), ('Carol','carol@gmail.com'), ('Dave','dave@gmail.com');
