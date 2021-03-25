/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      product_duration INT, 
      product_location JSONB,
      product_free_cancelation_max_day INT,
      is_pickup BOOLEAN DEFAULT FALSE,
      is_fixed_date_ticket BOOLEAN DEFAULT FALSE,
      is_collect_physical_ticket BOOLEAN DEFAULT FALSE,
      is_location_meetup BOOLEAN DEFAULT FALSE,
      is_joined_and_private_available BOOLEAN DEFAULT FALSE,
      is_hotel_pickup BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE product;
  `);
};
