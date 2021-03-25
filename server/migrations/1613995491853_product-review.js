/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add reviewer_id, host_id on the product_reviews table
  pgm.sql(`
    CREATE TABLE product_review (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      rating SMALLINT NOT NULL,
      comment VARCHAR,
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
