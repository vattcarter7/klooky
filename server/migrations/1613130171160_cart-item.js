/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add package_id, user_id on the cart_items table
  pgm.sql(`
    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      quantity_price_model JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE cart_items;
  `);
};
