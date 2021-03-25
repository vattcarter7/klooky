/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE language (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO language (name) VALUES ('english'),
                                       ('korean');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE language;
  `);
};
