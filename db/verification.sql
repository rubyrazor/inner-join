DROP TABLE IF EXISTS verification;

CREATE TABLE verification (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL CHECK (email != ''),
    ver_code VARCHAR(255) NOT NULL CHECK (ver_code != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );