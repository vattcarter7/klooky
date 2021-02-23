/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add product_id, reviewer_id, host_id on the product_reviews table
  pgm.sql(`
    CREATE TABLE product_reviews (
      id SERIAL PRIMARY KEY,
      rating SMALLINT NOT NULL,
      comment VARCHAR,
      photos JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_reviews;
  `);
};
