/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE packages_details (
      id SERIAL PRIMARY KEY,
      includes JSON,
      excludes JSON,
      itinerary JSON,
      validity JSON,
      addition_info JSON,
      prohibition_limitation_policy JSON,
      confirmation JSON,
      cancelation_policy JSON,
      is_pickup BOOLEAN DEFAULT FALSE,
      pickup_info JSON,
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
