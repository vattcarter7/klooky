/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE packages_details (
      id SERIAL PRIMARY KEY,
      package_includes JSONB,
      package_excludes JSONB,
      package_itinerary JSONB,
      package_duration INT, 
      package_pickup_info JSONB,
      package_additional_info JSONB,
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
