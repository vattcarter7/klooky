/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  //TODO: add user_id on the purchases table
  pgm.sql(`
    CREATE TABLE purchase (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      quantity_price_model JSONB NOT NULL,
      discount REAL DEFAULT 0,
      total REAL NOT NULL check (total > 0),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE purchase;
  `);
};
