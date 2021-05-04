/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (
      id                        SERIAL PRIMARY KEY,
      login_email               VARCHAR(150) UNIQUE check (login_email ~* '^.+@.+\..+$'),
      login_password            VARCHAR(128),
      signin_method             VARCHAR(20),
      social_network_id         BIGINT,
      firstname                 VARCHAR(100) NOT NULL,
      lastname                  VARCHAR(100) NOT NULL,
      gender                    VARCHAR(10) NOT NULL,
      user_role                 VARCHAR(50) DEFAULT 'user',
      contact_email             VARCHAR(150) check (login_email ~* '^.+@.+\..+$'),
      contact_phone             VARCHAR(30),
      active                    BOOLEAN DEFAULT true,
      password_reset_token      VARCHAR(200),
      password_reset_expires    TIMESTAMPTZ,
      created_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at                TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (email, password, firstname, lastname, gender) 
    VALUES ('sopheak@gmail.com', '123456', 'vatt', 'sopheak', 'male'),
           ('katie@gmail.com', '123456', 'katie', 'pocha', 'female');

  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
