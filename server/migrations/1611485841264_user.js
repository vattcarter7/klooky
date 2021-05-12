/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TYPE sigin_in_method_type AS ENUM ('email', 'facebook', 'google');
    CREATE TYPE gender_type AS ENUM ('male', 'female');
    CREATE TYPE user_role_type AS ENUM ('admin', 'subscriber', 'guide', 'establisher');

    CREATE TABLE users (
      id                        SERIAL PRIMARY KEY,
      avatar                    TEXT,
      login_email               VARCHAR(150) UNIQUE check (login_email ~* '^.+@.+\..+$'),
      login_password            VARCHAR(128),
      signin_method             sigin_in_method_type,
      social_network_user_id    VARCHAR(100),
      fullname                  VARCHAR(55),
      gender                    gender_type,
      user_role                 user_role_type DEFAULT 'subscriber',
      contact_email             VARCHAR(150) check (contact_email ~* '^.+@.+\..+$'),
      contact_phone             VARCHAR(30),
      active                    BOOLEAN DEFAULT true,
      banned                    BOOLEAN DEFAULT false,
      password_changed_at       TIMESTAMP WITH TIME ZONE,
      password_reset_token      VARCHAR(200),
      password_reset_expires    TIMESTAMP WITH TIME ZONE,
      created_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE users ADD CONSTRAINT signin_method_social_network_user_id UNIQUE (signin_method, social_network_user_id);

    INSERT INTO users (login_email, login_password, fullname, gender, signin_method, user_role) 
    VALUES ('sopheak@gmail.com', '123456', 'vatt sopheak', 'male', 'email', 'admin'),
           ('katie@gmail.com', '123456', 'katie pocha', 'female', 'email', 'guide'),
           ('david@gmail.com', '123456', 'david miles', 'female', 'facebook', 'establisher'),
           ('kon@gmail.com', '123456', 'kon york', 'male', 'facebook', 'subscriber');

  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
