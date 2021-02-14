/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add product_id, user_id on the purchases table
  pgm.sql(`
    CREATE TABLE purchases (
      id SERIAL PRIMARY KEY,
      quantity_price_model JSONB,
      discount REAL DEFAULT 0,
      total REAL NOT NULL check (total > 0),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE purchases;
  `);
};
