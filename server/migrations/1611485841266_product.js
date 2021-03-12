/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      product_name VARCHAR UNIQUE,
      is_pickup BOOLEAN DEFAULT FALSE,
      is_fixed_date_ticket BOOLEAN DEFAULT FALSE,
      is_collect_physical_ticket BOOLEAN DEFAULT FALSE,
      is_location_meetup BOOLEAN DEFAULT FALSE,
      is_joined_and_private_available BOOLEAN DEFAULT FALSE,
      is_hotel_pickup BOOLEAN DEFAULT FALSE,
      product_duration INT, 
      product_validity JSONB,
      product_overview TEXT,
      product_highlights JSON,
      product_location JSON,
      product_photos_with_description JSON,
      product_prohibition_limitation JSONB,
      product_confirmation JSONB,
      product_free_cancelation_max_day INT,
      product_cancelation_policy JSONB,
      product_additional_info JSON,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE products;
  `);
};
