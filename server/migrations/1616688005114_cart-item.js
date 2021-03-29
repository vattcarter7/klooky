/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE cart_item (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      user_id INT REFERENCES users(id) NOT NULL,
      quantity_price_model JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO cart_item (package_id, user_id, quantity_price_model)
    VALUES (1, 1, '[{ "name": "adult", "price": 15, "pax": 3 }, { "name": "kid", "price": 10, "pax": 1 }]'),
           (1, 1, '[{ "name": "성인", "price": 15, "pax": 3 }, { "name": "아동", "price": 10, "pax": 1 }]');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE cart_item;
  `);
};
