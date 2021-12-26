DROP TABLE IF EXISTS users_active CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE users_active (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL
);

CREATE TABLE transactions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sender_id BIGINT REFERENCES users_active(id),
    recipient_id BIGINT REFERENCES users_active(id),
    payment_method_id VARCHAR NOT NULL,
    payment_intent_id VARCHAR NOT NULL,
    amount INTEGER NOT NULL,
    payment_confirmed BOOLEAN NOT NULL
);