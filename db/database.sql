create TABLE person(
    person_id SERIAL PRIMARY KEY,
    person_name VARCHAR(255),
    person_photo VARCHAR(255),
    activity VARCHAR(255),
    achievements VARCHAR(255)
    region_id INT REFERENCES region(region_id)
);
create TABLE partner(
    partner_id SERIAL PRIMARY KEY,
    partner_name VARCHAR(255) UNIQUE NOT NULL,
    partner_surname VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone INTEGER UNIQUE NOT NULL,
    promoCode VARCHAR(255)
    );

create TABLE network(
    network_id SERIAL PRIMARY KEY,
    network_name VARCHAR(255),
    followers INTEGER,
    person_id INT REFERENCES person(person_id)
);
create TABLE region(
    region_id SERIAL PRIMARY KEY,
    region_name VARCHAR(255)
);


create TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE admin (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
ALTER TABLE users
ADD COLUMN user text;

ALTER TABLE users DROP COLUMN password;
ALTER TABLE personNetworks DROP COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE IF EXISTS public.personNetworks
    ADD COLUMN "id" integer;

user=postgres;password=BMW;host=localhost;port=5432;database=media_hub';pooling=true;min pool size=0;max pool size=100;connection lifetime=0;