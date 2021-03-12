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
