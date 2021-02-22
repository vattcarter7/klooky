/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add product_id, user_id on the purchases table
  pgm.sql(`
    CREATE TABLE product_review (
      id SERIAL PRIMARY KEY,
      rating SMALLINT NOT NULL,

      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_review;
  `);
};
