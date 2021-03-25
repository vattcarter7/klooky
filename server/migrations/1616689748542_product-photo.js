/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_photo (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      photo_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_photo;
  `);
};
