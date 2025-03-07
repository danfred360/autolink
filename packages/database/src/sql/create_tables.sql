CREATE TABLE user (
    username TEXT PRIMARY KEY,
    hashed_password TEXT,
    salt TEXT,
    first_name TEXT NULL,
    last_name TEXT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    image_url TEXT NULL
);
