/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      product_duration INT NOT NULL, 
      product_location JSONB NOT NULL,
      product_free_cancelation_max_day INT NOT NULL DEFAULT 0,
      product_validity_period INT NOT NULL DEFAULT 0,
      published BOOLEAN NOT NULL DEFAULT FALSE,
      is_pickup BOOLEAN NOT NULL DEFAULT FALSE,
      is_fixed_date_ticket BOOLEAN NOT NULL DEFAULT FALSE,
      is_collect_physical_ticket BOOLEAN NOT NULL DEFAULT FALSE,
      is_location_meetup BOOLEAN NOT NULL DEFAULT FALSE,
      is_joined_and_private_available BOOLEAN NOT NULL DEFAULT FALSE,
      is_hotel_pickup BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO product (product_duration, product_location, product_free_cancelation_max_day)
    VALUES (2, '[{ "lat": 123456789, "lng": 987654321 }]', 7);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product;
  `);
};
