/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE packages_details (
      id SERIAL PRIMARY KEY,
      includes JSONB,
      excludes JSONB,
      itinerary JSONB,
      validity JSONB,
      addition_info JSONB,
      prohibition_limitation_policy JSONB,
      confirmation JSONB,
      cancelation_policy JSONB,
      is_pickup BOOLEAN DEFAULT FALSE,
      is_fixed_date_ticket BOOLEAN DEFAULT FALSE,
      is_collect_physical_ticket BOOLEAN DEFAULT FALSE,
      is_location_meetup BOOLEAN DEFAULT FALSE,
      package_duration INT, 
      pickup_info JSONB,
      free_cancelation_max_day INT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE packages_details;
  `);
};
