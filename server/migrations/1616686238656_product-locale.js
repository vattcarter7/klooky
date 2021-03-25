/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product_locale (
      id SERIAL PRIMARY KEY,
      product_id INT REFERENCES product(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      product_name VARCHAR UNIQUE NOT NULL,
      product_validity JSONB NOT NULL,
      product_overview TEXT NOT NULL,
      product_highlights JSONB NOT NULL,
      product_prohibition_limitation JSONB,
      product_confirmation JSONB NOT NULL,
      product_cancelation_policy JSONB NOT NULL, 
      product_additional_info JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE product_locale ADD CONSTRAINT product_locale_unique UNIQUE (product_id, language_id);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product_locale;
  `);
};
