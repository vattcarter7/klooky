/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TYPE sigin_in_method_type AS ENUM ('email', 'facebook', 'google');
    CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

    CREATE TABLE users (
      id                        SERIAL PRIMARY KEY,
      login_email               VARCHAR(150) UNIQUE check (login_email ~* '^.+@.+\..+$'),
      login_password            VARCHAR(128),
      signin_method             sigin_in_method_type,
      social_network_user_id    VARCHAR(100),
      fullname                  VARCHAR(100),
      gender                    gender_type,
      user_role                 VARCHAR(50) DEFAULT 'subscriber',
      contact_email             VARCHAR(150) check (contact_email ~* '^.+@.+\..+$'),
      contact_phone             VARCHAR(30),
      active                    BOOLEAN DEFAULT true,
      password_reset_token      VARCHAR(200),
      password_reset_expires    TIMESTAMPTZ,
      created_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (login_email, login_password, fullname, gender, signin_method) 
    VALUES ('sopheak@gmail.com', '123456', 'vatt sopheak', 'male', 'email'),
           ('katie@gmail.com', '123456', 'katie pocha', 'female', 'email'),
           ('david@gmail.com', '123456', 'david miles', 'female', 'facebook');

  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
