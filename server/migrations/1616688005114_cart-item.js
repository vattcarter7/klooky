/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // TODO: add user_id INT REFERENCES user(id) NOT NULL,
  pgm.sql(`
    CREATE TABLE cart_item (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      quantity_price_model JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE cart_item;
  `);
};
