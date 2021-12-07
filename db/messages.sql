DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  