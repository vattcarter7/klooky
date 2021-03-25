/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add reviewer_id on the product_reviews table
  pgm.sql(`
    CREATE TABLE product_photo_description_locale (
      id SERIAL PRIMARY KEY,
      product_photo_id INT REFERENCES product_photo(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      description VARCHAR NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE product_photo_description_locale ADD CONSTRAINT product_photo_description_locale_unique UNIQUE (product_photo_id, language_id); 
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_photo_description_locale;
  `);
};
