/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE package_detail_locale (
      id SERIAL PRIMARY KEY,
      package_id INT REFERENCES package(id) NOT NULL,
      language_id INT REFERENCES language(id) NOT NULL,
      package_name VARCHAR,
      package_includes JSONB,
      package_excludes JSONB,
      package_itinerary JSONB,
      package_pickup_info JSONB,
      package_additional_info JSON,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    ALTER TABLE package_detail_locale ADD CONSTRAINT package_detail_locale_unique UNIQUE (package_id, language_id);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE package_detail_locale;
  `);
};
